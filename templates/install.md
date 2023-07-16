## Installation

An installation script is provided

```bash
# download the script
curl -s https://raw.githubusercontent.com/__git_repo__/main/utils/__program_name__ -O;
# make it executable
chmod +x get___program_name__;
# display the help
./get___program_name__ --help;
#	-b, --branch|--tag|--install-version <branch>: version to install
#	--install-directory <install-directory>: where to install
#	--install-file <install-file>: rc files to install to, forces install, repeatable
#	-i|--install|--no-install: install in bashrc
#	--remove-installer|--no-remove-installer: remove install script itself
#	aliases: --rm,
#	--ssh|--no-ssh: clone using ssh
#	--zip|--no-zip: install using zip archive, not recommended

# generic install
./get___program_name__ --install;
```