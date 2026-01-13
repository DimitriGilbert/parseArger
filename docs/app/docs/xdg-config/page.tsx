import { CodeBlock } from '@/components/ui/code-block';
import { SarcasticAside } from '@/components/ui/sarcastic-aside';
import { CommandLine } from '@/components/ui/command-line';
import { SectionHeader } from '@/components/ui/section';

export default function XdgConfigPage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeader>XDG Config Directories</SectionHeader>
        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
          Because littering <code>~</code> with dotfiles is so 1990s. ParseArger can generate
          XDG Base Directory compliant configuration handling for your scripts. Works on Linux, macOS,
          and even Windows (if you're into that).
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">What is XDG?</h2>
        <p className="text-foreground">
          The <a href="https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html" className="underline hover:text-primary">XDG Base Directory Specification</a> defines
          where your app should store its config, data, and cache. No more <code>~/.myapp</code>, <code>~/.myapprc</code>, <code>~/.myapp.conf</code> chaos.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-2 text-primary">Directory</th>
                <th className="text-left py-2 text-primary">Purpose</th>
                <th className="text-left py-2 text-primary">Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2"><code>XDG_CONFIG_HOME</code></td>
                <td className="py-2">User configuration</td>
                <td className="py-2"><code>~/.config</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2"><code>XDG_DATA_HOME</code></td>
                <td className="py-2">User data files</td>
                <td className="py-2"><code>~/.local/share</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2"><code>XDG_CACHE_HOME</code></td>
                <td className="py-2">Non-essential cache</td>
                <td className="py-2"><code>~/.cache</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <SarcasticAside variant="mild">
          On Windows with Git Bash/MSYS2, it falls back to <code>%APPDATA%</code> and <code>%LOCALAPPDATA%</code>.
          Because Microsoft has their own ideas about where things should go.
        </SarcasticAside>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Basic Usage</h2>
        <p className="text-foreground">
          Add XDG support to your script with the <code>--xdg</code> option:
        </p>

        <CommandLine 
          command={`parseArger generate \\
  --xdg "myapp" \\
  --help-message "My awesome app" \\
  --output ./myapp.sh`}
        />

        <p className="mt-4 text-foreground">
          Or use the annotation in an existing script:
        </p>

        <CodeBlock>{`# @parseArger-xdg "myapp" --config --data --cache`}</CodeBlock>

        <p className="mt-4 text-muted-foreground">
          This generates helper functions and automatically initializes your config directories
          when the script runs. Your users' home directories will thank you.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Options</h2>
        
        <ul className="list-disc pl-5 space-y-4 text-muted-foreground">
          <li>
            <strong className="text-foreground">--xdg &lt;app-name&gt;</strong>: Enable XDG support with the given app name.
            This name becomes your subdirectory in the XDG paths.
            <CodeBlock>{`parseArger generate --xdg "myapp"`}</CodeBlock>
            <p className="mt-2">Creates: <code>~/.config/myapp/</code>, <code>~/.local/share/myapp/</code></p>
          </li>
          <li>
            <strong className="text-foreground">--xdg-config / --no-xdg-config</strong>: Enable/disable config directory support. On by default.
            <CodeBlock>{`parseArger generate --xdg "myapp" --no-xdg-config`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--xdg-data / --no-xdg-data</strong>: Enable/disable data directory support. On by default.
            <CodeBlock>{`parseArger generate --xdg "myapp" --no-xdg-data`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--xdg-cache / --no-xdg-cache</strong>: Enable/disable cache directory support. Off by default.
            <CodeBlock>{`parseArger generate --xdg "myapp" --xdg-cache`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">--xdg-config-file &lt;name&gt;</strong>: Name of the config file. Default is <code>config</code>.
            <CodeBlock>{`parseArger generate --xdg "myapp" --xdg-config-file "settings.conf"`}</CodeBlock>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Generated Functions</h2>
        <p className="text-foreground">
          Your script gets a bunch of helper functions. Use them. They're nice.
        </p>

        <h3 className="text-lg font-bold text-accent mt-4">Directory Functions</h3>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">xdg_init()</strong>: Initializes all XDG paths. Called automatically after argument parsing.
          </li>
          <li>
            <strong className="text-foreground">xdg_config_dir()</strong>: Returns the config directory path.
            <CodeBlock>{`config_path=$(xdg_config_dir)
echo "Config is at: $config_path"`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">xdg_data_dir()</strong>: Returns the data directory path.
          </li>
          <li>
            <strong className="text-foreground">xdg_cache_dir()</strong>: Returns the cache directory path.
          </li>
          <li>
            <strong className="text-foreground">xdg_ensure_config_dir()</strong>: Creates the config directory if it doesn't exist.
          </li>
          <li>
            <strong className="text-foreground">xdg_ensure_data_dir()</strong>: Creates the data directory if it doesn't exist.
          </li>
          <li>
            <strong className="text-foreground">xdg_ensure_cache_dir()</strong>: Creates the cache directory if it doesn't exist.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-accent mt-4">Config File Functions</h3>
        <p className="text-muted-foreground mb-2">
          Because you probably want to actually store and read config values:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">xdg_config_file()</strong>: Returns the full path to the config file.
          </li>
          <li>
            <strong className="text-foreground">xdg_load_config()</strong>: Sources the config file. Returns 0 if loaded, 1 if file doesn't exist.
            <CodeBlock>{`if xdg_load_config; then
  echo "Loaded config, API_KEY is: $API_KEY"
else
  echo "No config file yet"
fi`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">xdg_save_config VAR VALUE</strong>: Save a variable to the config file.
            <CodeBlock>{`xdg_save_config "API_KEY" "sk-12345"
xdg_save_config "DEBUG=true"  # Also works`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">xdg_get_config VAR</strong>: Get a value without sourcing the whole file.
            <CodeBlock>{`api_key=$(xdg_get_config "API_KEY")
if [ -n "$api_key" ]; then
  echo "Found key: $api_key"
fi`}</CodeBlock>
          </li>
          <li>
            <strong className="text-foreground">xdg_remove_config VAR</strong>: Remove a variable from the config file.
            <CodeBlock>{`xdg_remove_config "OLD_SETTING"`}</CodeBlock>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Full Example</h2>
        <p className="text-foreground">
          Here's a complete script that uses XDG config:
        </p>

        <CommandLine 
          command={`parseArger generate \\
  --xdg "myapp" \\
  --xdg-config-file "settings" \\
  --opt 'api-key "API key for the service"' \\
  --flag 'save "Save the key for future use"' \\
  --help-message "My API Client" \\
  --output ./api-client.sh`}
        />

        <p className="mt-4 text-foreground">
          Then add your business logic at the end:
        </p>

        <CodeBlock>{`# Your code after # @parseArger-end

# Try to load saved config
xdg_load_config

# Use provided key or fall back to saved one
api_key="\${_arg_api_key:-\$API_KEY}"

if [ -z "$api_key" ]; then
  die "No API key provided. Use --api-key or save one with --save"
fi

# Save for next time if requested
if [ "$_arg_save" == "on" ]; then
  xdg_save_config "API_KEY" "$api_key"
  echo "API key saved to \$(xdg_config_file)"
fi

# Do the actual work
echo "Making API call with key: \${api_key:0:8}..."
# curl -H "Authorization: Bearer $api_key" ...`}</CodeBlock>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Cross-Platform Magic</h2>
        <p className="text-foreground">
          The generated code detects your platform and does the right thing:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-2 text-primary">Platform</th>
                <th className="text-left py-2 text-primary">Config Default</th>
                <th className="text-left py-2 text-primary">Data Default</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2">Linux</td>
                <td className="py-2"><code>~/.config/app</code></td>
                <td className="py-2"><code>~/.local/share/app</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">macOS</td>
                <td className="py-2"><code>~/.config/app</code></td>
                <td className="py-2"><code>~/.local/share/app</code></td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Windows (Git Bash)</td>
                <td className="py-2"><code>%APPDATA%/app</code></td>
                <td className="py-2"><code>%LOCALAPPDATA%/app</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <SarcasticAside variant="spicy">
          If you set <code>XDG_CONFIG_HOME</code> yourself, we respect it. Even on Windows.
          We're not savages.
        </SarcasticAside>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Generated Variables</h2>
        <p className="text-foreground">
          Behind the scenes, these variables are available in your script:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li><code>$_xdg_app_name</code> - Your app name</li>
          <li><code>$_xdg_config_file</code> - Config filename</li>
          <li><code>$_xdg_config_home</code> - Full path to config dir</li>
          <li><code>$_xdg_data_home</code> - Full path to data dir</li>
          <li><code>$_xdg_cache_home</code> - Full path to cache dir</li>
        </ul>

        <SarcasticAside variant="mild">
          Use the functions though. That's what they're for.
        </SarcasticAside>
      </div>
    </div>
  );
}
