#!/bin/bash

source "./lib/bashunit_ext"
pabin=./parseArger
ex=("$pabin" generate)
tftmp_file="/tmp/gentsttmp";

function test_generate_xdg_basic() {
	local tfile="${tftmp_file}_xdg_basic";
	local ex_=("${ex[@]}" --xdg "testapp" --help-message "XDG test app")
	local out=$("${ex_[@]}");
	
	assert_exit_code "0" "$?";
	assert_not_empty "$out";
	
	# Check that XDG declaration comment is present
	assert_contains "# @parseArger-xdg \"testapp\"" "$out";
	
	# Check that XDG variables are initialized
	assert_contains "_xdg_app_name=\"testapp\"" "$out";
	assert_contains "_xdg_config_home=" "$out";
	assert_contains "_xdg_data_home=" "$out";
	
	# Check that xdg_init function is generated
	assert_contains "xdg_init()" "$out";
	
	# Check that xdg_init is called at end of parsing
	assert_contains "xdg_init;" "$out";
	
	# Check cross-platform support
	assert_contains "MINGW" "$out";
	assert_contains "MSYS" "$out";
	assert_contains "CYGWIN" "$out";
	assert_contains "APPDATA" "$out";
	assert_contains "XDG_CONFIG_HOME" "$out";
	
	# Create and run the script to verify it works
	echo "$out" > "$tfile";
	chmod +x "$tfile";
	
	# Script should run without errors
	local run_result;
	run_result=$("$tfile" 2>&1);
	assert_exit_code "0" "$?";
	
	rm "$tfile";
}

function test_generate_xdg_helper_functions() {
	local tfile="${tftmp_file}_xdg_functions";
	local ex_=("${ex[@]}" --xdg "myhelperapp" --xdg-config --xdg-data --xdg-cache)
	local out=$("${ex_[@]}");
	
	assert_exit_code "0" "$?";
	
	# Check getter functions
	assert_contains "xdg_config_dir()" "$out";
	assert_contains "xdg_data_dir()" "$out";
	assert_contains "xdg_cache_dir()" "$out";
	
	# Check ensure functions
	assert_contains "xdg_ensure_config_dir()" "$out";
	assert_contains "xdg_ensure_data_dir()" "$out";
	assert_contains "xdg_ensure_cache_dir()" "$out";
	
	# Check load/save config functions
	assert_contains "xdg_load_config()" "$out";
	assert_contains "xdg_save_config()" "$out";
	assert_contains "xdg_get_config()" "$out";
	assert_contains "xdg_remove_config()" "$out";
	assert_contains "xdg_config_file()" "$out";
}

function test_generate_xdg_no_cache() {
	local ex_=("${ex[@]}" --xdg "nocacheapp" --no-xdg-cache)
	local out=$("${ex_[@]}");
	
	assert_exit_code "0" "$?";
	
	# Should have config and data
	assert_contains "xdg_config_dir()" "$out";
	assert_contains "xdg_data_dir()" "$out";
	
	# Should NOT have cache
	assert_not_contains "xdg_cache_dir()" "$out";
	assert_not_contains "xdg_ensure_cache_dir()" "$out";
}

function test_generate_xdg_custom_config_file() {
	local ex_=("${ex[@]}" --xdg "customcfgapp" --xdg-config-file "settings.conf")
	local out=$("${ex_[@]}");
	
	assert_exit_code "0" "$?";
	
	# Check custom config file name
	assert_contains "_xdg_config_file=\"settings.conf\"" "$out";
}

function test_xdg_runtime_functions() {
	local tfile="${tftmp_file}_xdg_runtime";
	local config_dir="/tmp/xdg_test_config_$$";
	local ex_=("${ex[@]}" --xdg "runtimetest" --xdg-config --no-xdg-data --no-xdg-cache)
	local out=$("${ex_[@]}");
	
	echo "$out" > "$tfile";
	# Add test code at the end
	cat >> "$tfile" << 'EOF'

# Test the XDG functions work at runtime
XDG_CONFIG_HOME="/tmp/xdg_test_config_$$"
xdg_init

# Test get functions
config_path=$(xdg_config_dir)
if [[ "$config_path" != "/tmp/xdg_test_config_$$/runtimetest" ]]; then
	echo "FAIL: config_path is $config_path"
	exit 1
fi

# Test save and load
xdg_save_config "TEST_VAR" "test_value"
loaded_value=$(xdg_get_config "TEST_VAR")
if [[ "$loaded_value" != "test_value" ]]; then
	echo "FAIL: loaded_value is $loaded_value"
	exit 1
fi

# Cleanup
rm -rf "/tmp/xdg_test_config_$$"
echo "All XDG runtime tests passed"
exit 0
EOF
	
	chmod +x "$tfile";
	
	# Run the test
	local run_result;
	run_result=$("$tfile" 2>&1);
	assert_exit_code "0" "$?";
	assert_contains "All XDG runtime tests passed" "$run_result";
	
	rm "$tfile";
}

function test_parse_xdg_annotation() {
	local tfile="${tftmp_file}_parse_xdg";
	local tfile_parsed="${tftmp_file}_parse_xdg_parsed";
	
	# Create a file with XDG annotation
	cat > "$tfile" << 'EOF'
#!/bin/bash
# @parseArger-begin
# @parseArger-help "Parse XDG test"
# @parseArger-xdg "parsetest" --config --data --no-cache
# @parseArger-declarations
# @parseArger-declarations-end

# @parseArger-utils
# @parseArger-utils-end

# @parseArger-parsing
# @parseArger-parsing-end
# @parseArger-end

echo "Script works"
EOF
	
	chmod +x "$tfile";
	
	# Parse the file
	./parseArger parse "$tfile" > "$tfile_parsed";
	assert_exit_code "0" "$?";
	
	# Check parsing preserved XDG annotation
	local parsed_content;
	parsed_content=$(cat "$tfile_parsed");
	assert_contains "# @parseArger-xdg \"parsetest\"" "$parsed_content";
	
	# Check XDG functions were generated
	assert_contains "xdg_init()" "$parsed_content";
	assert_contains "_xdg_app_name=\"parsetest\"" "$parsed_content";
	
	# Make it executable and run
	chmod +x "$tfile_parsed";
	local run_result;
	run_result=$("$tfile_parsed" 2>&1);
	assert_exit_code "0" "$?";
	assert_contains "Script works" "$run_result";
	
	rm "$tfile" "$tfile_parsed";
}
