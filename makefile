documentation:
	./parseArger document --file ./parseArger --directory ./bin --out documentation.md --no-append-output;
reparse:
	./parseArger bulk-parse --file ./parseArger --directory ./bin;
complete:
	./parseArger completely parseArger ./parseArger --subcommand-directory ./bin > completely.yaml;
	cat ./complete_extra.yaml >> completely.yaml;
	completely generate;
build: reparse documentation complete