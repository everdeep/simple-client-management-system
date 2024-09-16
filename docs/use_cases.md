## Use Cases
### Use Case 1: Client Creation
#### Description
As a client manager I want to be able to create a new client so that I can keep track of their information.
#### Pre-conditions
- The client manager is on the client creation page.
- The client manager has the necessary information to create a new client.
#### Post-conditions
- A new client is created and added to the list of clients.
#### Normal Flow
1. The client manager clicks on the "Create Client" button.
2. The client manager fills in the client's information on the open form dialog.
3. The client manager clicks on the "Save" button.
4. The client is created and added to the list of clients.
#### Alternative Flows
- If the client manager clicks on the "Cancel" button, the client creation process is aborted.
- If the client manager does not fill in all the required fields, an error message is displayed.
- If the client manager tries to create a client with duplicate information, an error message is displayed.
- If the client manager encounters a system error during the client creation process, an error message is displayed.

### Use Case 2: Client Viewing
#### Description
As a client manager I want to be able to view a list of all clients so that I can see all the clients I am managing.
#### Pre-conditions
- The client manager is on the client list page.
- There are existing clients in the system.
#### Post-conditions
- The client manager can view a list of all clients.
- The client manager can see the details of each client.
- The client manager can update a client's information.
- The client manager can delete a client.
- The client manager can create a new client.
- Premium
  - The client manager can navigate between pages of the client list.
  - The client manager can adjust the number of clients displayed per page.
  - The client manager can search for a specific client.
  - The client manager can filter clients by funding source.
  - The client manager can filter clients by language.
  - The client manager can sort clients by name.
  - The client manager can sort clients by date of birth.
  - The client manager can sort clients by funding source.
  - The client manager can sort clients by language.
  - The client manager can sort clients by date added.
  - The client manager can sort clients by date updated.
#### Normal Flow
1. The client manager navigates to the client list page.
2. The client manager views the list of clients.
3. The client manager can see the details of each client.
#### Alternative Flows
- If there are no clients in the system, a message is displayed indicating that there are no clients to display.
- If the client manager encounters a system error while viewing the client list, an error message is displayed.
- If the client manager encounters an error while performing actions on a client, an error message is displayed.
- If the client manager encounters an error while navigating between pages, an error message is displayed.
- If the client manager encounters an error while adjusting the number of clients displayed per page, an error message is displayed.

### Use Case 3: Client Updating
#### Description
As a client manager I want to be able to update a client's information so that I can keep their information up to date.
#### Pre-conditions
- The client manager is on the client list page.
- The client manager has selected a client to update.
- The client manager has the necessary information to update the client.
#### Post-conditions
- The client's information is updated.
- The client manager is returned to the client list page.
#### Normal Flow
1. The client manager selects a client from the list.
2. The client manager clicks on the "Update" button.
3. The client manager updates the client's information on the open form dialog.
4. The client manager clicks on the "Save" button.
5. The client's information is updated.
#### Alternative Flows
- If the client manager clicks on the "Cancel" button, the client update process is aborted.
- If the client manager does not fill in all the required fields, an error message is displayed.
- If the client manager tries to update a client with duplicate information, an error message is displayed.
- If the client manager encounters a system error during the client update process, an error message is displayed.
- If the client manager encounters an error while returning to the client list page, an error message is displayed.
- If the client manager encounters an error while updating the client's information, an error message is displayed.

### Use Case 4: Client Deletion
#### Description
As a client manager I want to be able to delete a client so that I can remove them from the system.
#### Pre-conditions
- The client manager is on the client list page.
- The client manager has selected a client to delete.
- The client manager has confirmed the deletion action.
#### Post-conditions
- The client is removed from the list of clients.
#### Normal Flow
1. The client manager selects a client from the list.
2. The client manager clicks on the "Delete" button.
3. The client manager confirms the deletion action.
4. The client is removed from the list of clients.
#### Alternative Flows
- If the client manager clicks on the "Cancel" button, the client deletion process is aborted.
- If the client manager encounters a system error during the client deletion process, an error message is displayed.

### Use Case 5: Client Searching
