1. add pod.yaml to build a pod based on a certain docker image
2. `$kubectl apply -f ./deploy/pod.yaml`
3. to run the pod we do port forward:
   -- `kubectl port-forward POD_NAME 3030:3000`
4. To access the app inside the pod
   -- `kubectl exec -it POD_NAME -- sh`
5. To delete a pod
   -- `kubectl delete pod POD_NAME`
6. To get all pods
   -- `kubectl get pods`
   -- `kubectl get pods -o wide`
7. All pods were added to default namespace if not specified.
   -- to add a namespace

   1. add it in the cluster
      -- `kubectl ns create NAME` NOT PREFERRED
      -- Add it in a yaml file. and then apply it using `$kubectl apply -f PATH`
      -- for simplicity, we could add it at the top of pod.yaml
   2. add it to each pod in pod.yaml

8. Now, after adding namespace, we can make each pod call the other using the ip. However, this is
   -- not a best practice since the pods are short-lived and their ips change with each restart

9. Solution is to create a service for each pod.

10. create a .yaml file and add the services configuration (service.yaml).
    -- then `$kubectl apply -f ./deploy/service.yaml`
    -- make sure to add in service.yaml the following

    ```
    spec:
       selector:
          application: ANY_NAME
    ```

    -- and add the following in the pod configuration

    ```
    labels:
       application: ANY_NAME
    ```

    -- importa

11. to get all services
    -- `kubectl -n nestjs-app get services `
    -- `kubectl -n nestjs-app get services -o wide`

12. To describe a service
    -- `kubectl -n nestjs-app describe svc SERVICE_NAME`

13. To delete a service
    -- `kubectl -n NAME_SPACE delete svc SERVICE_NAME`
    -- `kubectl -n NAME_SPACE delete svc --all`

14. Now to we have all 3 services (app-posts, app-votes, postgres) and 3 pods for each service
    -- each service might have more than one pod, if this service is called, it directs the request
    -- to each pod alternatevly

15. In order to check if our service is reachable, we make port forward to the app-posts pod, then we visit it from browser localhost:3001/users, It will call our app, the app will call the postgres database by its service name as we configured its pod. The postgres service know the current ip of the postgres pod, will call it. 

15. Now to add ingress so we can call the services by their addresses online not using localhost.

16. Add the .yaml file to include ingress configurations. Then `$kubectl apply -f ./deploy/ingress.yaml`

17. To get ingress
   -- `kubectl -n NAME_SPACE get ingress`

18. To send request to app-posts using ingress from host terminal 
   -- The host should be one of the hosts we could get using `kubectl -n NAME_SPACE get ingress`
   -- `curl -H "host:app-posts.com" "http://$(minikube ip)/health"`