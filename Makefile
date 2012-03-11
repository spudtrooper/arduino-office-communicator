PORT=8123

all: server.py
	python $< $(PORT)

repl: repl.py
	python $<

clean:
	rm -f *~ *.pyc