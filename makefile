documentation:
	./parseArger document --file ./parseArger --directory ./bin --out documentation.md --no-append-output;
reparse:
	./parseArger bulk-parse --file ./parseArger --directory ./bin;
complete:
	./parseArger completely parseArger ./parseArger --subcommand-directory ./bin --extra-file complete_extra.yaml;
build: reparse documentation complete