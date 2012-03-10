PORT=8123

all: server.py
	python $< $(PORT)

clean:
	rm -f *~ *.pyc