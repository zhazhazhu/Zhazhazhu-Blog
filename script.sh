#!bin/bash
WORK_PATH='/web/blogs/Zhazhazhu-Blog'
cd $WORK_PATH
echo 'remote old code'
git remote -v
echo 'pull new code'
git fetch origin
echo 'merge new code'
git merge origin/master
echo 'build code'
npm run build
echo 'start build'
docker build -t zhazhazhu-blog:1.0 .
echo 'stop old docker'
docker stop zhazhazhu-blog-old
echo 'delete old docker ps'
docker rm zhazhazhu-blog-old
echo 'delete old docker images'
docker rmi zhazhazhu-blog-old
echo 'run new docker'
docker run -p 80:80 --name zhazhazhu-blog-old -d zhazhazhu-blog:1.0
echo "deploy end"