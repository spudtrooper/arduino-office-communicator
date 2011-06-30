PORT=8123

all: server.py
	chmod +x $<
	./$< $(PORT)

clean:
	rm -f *~ *.pyc