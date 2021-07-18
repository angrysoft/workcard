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
	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)$(WWW)/scripts
	install -v -m 655 -g $(GRP) -o $(USR) index.html $(DESTDIR)$(WWW)/index.html
	install -v -m 655 -g $(GRP) -o $(USR) app.js $(DESTDIR)$(WWW)/app.js
	install -v -m 655 -g $(GRP) -o $(USR) style.min.css $(DESTDIR)/$(WWW)/static/style.min.css

clean:
	rm -f dist/*.d.ts dist/*.tsbuildinfo dist/*.js
