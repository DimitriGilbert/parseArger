documentation:
	./parseArger document --file ./parseArger --directory ./bin --out documentation.md --no-append-output;
reparse:
	./parseArger bulk-parse --directory ./bin/pos;
	./parseArger bulk-parse --directory ./bin/opt;
	./parseArger bulk-parse --directory ./bin/flag;
	./parseArger bulk-parse --directory ./bin/help;
	./parseArger bulk-parse --directory ./bin/verbose;
	./parseArger bulk-parse --directory ./bin/version;
	./parseArger bulk-parse --directory ./utils;
	./parseArger bulk-parse --directory ./bin --no-subdirectory;
	@./parseArger parse ./parseArger;
complete:
	./parseArger completely parseArger ./parseArger --subcommand-directory ./bin --extra-file complete_extra.yaml;
build: reparse documentation complete