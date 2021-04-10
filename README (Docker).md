1. Create the Dockerfile
2. Create an image for the app using the Docker file `$ docker build -t sahlkhalifa/app-posts:1.0 .`
3. now the image on the local, we can add it in a container to run it:
4. `$ docker run -d -v "$(pwd)"/stats:/stats -e PORT=5000 -p3001:5000 sahlkhalifa/app-posts:1.0`

   -- With postgres `docker run -d --network app-posts -p 3000:3000 -v "$(pwd)"/stats:/app-posts/stats -e DB_DATABASE=postgres -e DB_USER=postgres -e DB_PASSWORD=123456 -e DB_HOST=172.18.0.2 sahlkhalifa/app-posts:4.0`

5. access the application using `$ docker exec -it CONTAINER_ID sh`
6. get the logs of a container `$ docker logs CONTAINER_ID`
7. get data about the container `$ docker inspect CONTAINER_NAME`
8. delete a container `$ docker container rm -f CONTAINER_ID`
9. delete an image `$ docker rmi -f IMAGE_NAME`
10. push image to docker hub `docker push sahlkhalifa/app-posts:3.0` sahlkhalifa must be a logged docker ID
11. Now to run a postgres image using `docker run -d --name pg --network app-posts -v /home/sahl/docker_pg_data:/var/lib/postgresql/data -e PGDATA=/var/lib/postgresql/data/pgdata -e POSTGRES_PASSWORD=123456 postgres`
    -- mount on /home/sahl/docker_pg_data as if tried to mount on the hard drive will fail due to permissions. As postgres will try to change the owner of this file and will fail cuase it is NTFS (windows file system).
