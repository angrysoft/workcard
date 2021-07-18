USR=http
GRP=http
PREFIX = /usr
WWW=/var/www/workcard

all: buildjs buildcss

buildjs: src/
	tsc -b src

buildcss: style.scss
	sassc -t compressed style.scss static/style.min.css

install: index.html  static/style.min.css static/angry-mini.min.css static/scripts/app.js
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)$(WWW)
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)$(WWW)/static
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)$(WWW)/static/scripts
	install -v -m 655 -g $(GRP) -o $(USR) index.html $(DESTDIR)$(WWW)/index.html
	install -v -m 655 -g $(GRP) -o $(USR) static/scripts/app.js $(DESTDIR)$(WWW)/static/scripts/app.js
	install -v -m 655 -g $(GRP) -o $(USR) static/style.min.css $(DESTDIR)$(WWW)/static/style.min.css
	install -v -m 655 -g $(GRP) -o $(USR) static/angry-mini.min.css $(DESTDIR)$(WWW)/static/angry-mini.min.css

clean:
	rm -f dist/*.d.ts dist/*.tsbuildinfo dist/*.js
