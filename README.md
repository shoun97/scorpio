"# scorpio" 

docker build -t scorpio-prod .
docker run -d -p 3000:3000 --env-file .env --name scorpio scorpio-prod
docker run -d -p 3000:3000 -e NODE_ENV=production --name scorpio scorpio-prod
