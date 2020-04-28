# zoho-grid-widget-vue

This is an example widget that leverages the [Vue](http://vuejs.org) Javascript Framework (w/ [Vuex](https://vuex.vuejs.org/)) to create a dynamic related list that can fetch data from any external source and display directly in your CRM or Creator app.

This project integrates the [Zoho Embbeded SDK](https://github.com/ZohoDevelopers/embeddedApp-js-sdk/releases/) to leverage callouts to external services as well as providing data from the related record. This example fetches a list of public repos in the ZohoDevelopers github organization by default, but can also accept custom values based on a custom field from the module.

![image](https://user-images.githubusercontent.com/3085186/80496162-cdab0d00-8936-11ea-9742-935285dac1e8.png)

## Project setup

### Download and install the app

``` shell
git clone git@github.com:caretgrowth/zoho-grid-widget-vue.git
cd zoho-grid-widget-vue
yarn install
```

### Setup Zoho Connector

To make callouts to 3rd party APIs, you must [setup a Connector](https://www.zoho.com/crm/developer/docs/connectors/set-up.html) to the service you want to leverage. Be sure to note the link name as it is required in the script. For this specific demo, you must create a connector to Github service with the user scope. You must update the value in store/index.js file with the link name of your connection.

![image](https://user-images.githubusercontent.com/3085186/80398755-2078bc00-8886-11ea-8998-e2ecd7da3cac.png)

### Create Widget and Related List (CRM)

1) Create and login to a sandbox (local hosted only works with sandboxes)
2) [Create a widget](https://help.zoho.com/portal/en/kb/crm/developer-guide/widgets/articles/work-with-widgets#Adding_a_Widget)
   1) Widget Type: Related List
   2) Hosting: External
   3) Base URL: <http://localhost:8080/index.html>
      - make sure this url matches your locally running app
3) Add the related list to the record view
   - Open a record of the type you wish to install
   - Click "Add Related List" from the side panel on the left
   - Choose Widget and Install the widget you created in step 2
4) Make sure you are running the app with `yarn serve` and that you can access it outside the CRM at the Base Url from above. It won't fully work, but you should be able to see the controls load with no errors in the console.
5) Refresh the page and navigate to the new widget in the CRM

### Optional: Create Github Username Field

To demonstrate the integration with the related record, you can create a field on the module called "Github Username". Updating this value will fetch all public repos for that user. The username should match the value from the github url to the repository.

### Compiles and hot-reloads for development

``` shell
yarn serve
```

### Compiles and minifies for production

``` shell
yarn build
```

This command will compile all files in the dist directory and uses **zet pack** to create a deployable zip file. The zip file will be the name of the root folder of the project and be put in the dist directory. This is the file you can upload to be hosted by Zoho. Built files will be created /app for compatibility with zet pack command.

### Lints and fixes files

``` shell
yarn lint
```

### Customize configuration

To make this a creator app, all you need to do is update the value in the plugin-manifest.json from "CRM" to "CREATOR". This value is leveraged by the [Zoho Extension Toolkit](https://www.npmjs.com/package/zoho-extension-toolkit) and will cause build/validate errors if removed.

For most APIs where you only want to recieve data and display in the grid, you should only have to change two parts of the application to get it working:

1) store.state.grid_columns - You must modify the array to include the fields from the returned data with the exact names of the post processed data.
2) Customize the Action **setGridData** to fetch and process the specific API you need to interact with.

It is recommended you remove the Debug Information Buttons before publishing. These are good for troubleshooting async issues but aren't necessary to the users.

## Code of Conduct

Please refer to the [code of conduct](/CODE_OF_CONDUCT.json) for expectations of contributors and participants.

## Contributions

Check out the [contributing guidelines](/CONTRIBUTING.json) for more information.

