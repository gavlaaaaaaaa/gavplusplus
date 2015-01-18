git add .
git commit -m "$1"
git push -u origin master

tar -zcvf website.tar.gz .

