USR=http
GRP=http
PREFIX = /usr

all: buildjs buildcss

buildjs: src/
	tsc -b src

buildcss: style.scss
	sassc -t compressed style.scss static/style.min.css

# install: index.html canvas.js style.min.css
# 	install -v -m 755  -g $(GRP) -o $(USR) -d $(DESTDIR)/var/www/ledgrid
# 	install -v -m 655 -g $(GRP) -o $(USR) index.html $(DESTDIR)/var/www/ledgrid/index.html
# 	install -v -m 655 -g $(GRP) -o $(USR) canvas.js $(DESTDIR)/var/www/ledgrid/canvas.js
# 	install -v -m 655 -g $(GRP) -o $(USR) style.min.css $(DESTDIR)/var/www/ledgrid/style.min.css

clean:
	rm -f dist/*.d.ts dist/*.tsbuildinfo dist/*.js
