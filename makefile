documentation:
	./parseArger document --file ./parseArger --directory ./bin --out documentation.md --no-append-output;
reparse:
	./parseArger bulk-parse --file ./parseArger --directory ./bin;
build: reparse documentation