- For each project, UI module and Backend module should be separate
- UI module should be SPA
- Backend module should be Microservice
- Jenkins job should be there for each repository for automation build
- Unit automation test coverage should be above 80% 
- Each module should support multi tenancy
- Every table must contain the following mandatory fields to support multi tenancy
  
 `" ddo_org_id,ddo_client_id,created,createdby,updated,updatedby"`
- Authentication code should not be tightly coupled with functional code in UI and Backend application
- Application logs must follow below standard pattern

   `" timestamp appname log_level correlationid endpoint remoteaddress clientId OrgId UserID  Message"`



