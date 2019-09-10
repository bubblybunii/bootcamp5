docker build -t nextjs .
docker tag nextjs:latest 698702629546.dkr.ecr.ap-southeast-1.amazonaws.com/nextjs:latest
docker push 698702629546.dkr.ecr.ap-southeast-1.amazonaws.com/nextjs:latest