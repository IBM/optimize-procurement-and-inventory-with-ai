# Create a web-application to optimize inventory 

<!-- ![finalDemo](https://user-images.githubusercontent.com/10428517/82013347-f7e71500-962e-11ea-9c28-2dec7d5b30cd.gif) -->

![DOproj2](https://media.github.ibm.com/user/79254/files/1a267380-1f7e-11eb-8806-0299b3a9fc44)

In this code pattern we will create a web-based application to optimize inventory.

Using historical demand data to train our machine learning model, we can predict demand for certain items more accurately in the 
future, and ensure that our customers will be able to purchase what they want. Using this predicted demand as input, 
along with manufacturing plant data such as cost and capacity, our application will enable a store manager to quickly 
choose the best manufacturing plants in order to optimize inventory and minimize cost. 

When the reader has completed this code pattern they will understand how to:

* Deploy a Node.js based web application
* Send and receive messages from a deployed Watson Machine Learning model using REST APIs

### Architecture Components

![Architecture Components](./public/images/arch.png)

## Flow Description
1. The user creates an IBM Watson Studio Service on IBM Cloud.
2. The user creates an IBM Cloud Object Storage Service and adds that to Watson Studio.
3. The user uploads the demand and plant data files into Watson Studio.
4. The user creates an Decision Optimization experiment and sets objectives to minimize cost via the modeling assistant.
5. The user saves the Decision Optimization as a model, and deploys it using Watson Machine Learning.
6. The user uses the Node.js application to connect to the deployed model via API and finds the optimal plant selection based on cost and capacity.

## Included components
*	[IBM Watson Studio](https://cloud.ibm.com/catalog/services/watson-studio) - IBM Watson® Studio helps data scientists and analysts prepare data and build models at scale across any cloud.
*	[IBM Watson Machine Learning](https://cloud.ibm.com/catalog/services/machine-learning) - IBM Watson® Machine Learning helps data scientists and developers accelerate AI and machine-learning deployment. 
*	[IBM Cloud Object Storage](https://cloud.ibm.com/catalog/services/cloud-object-storage) - IBM Cloud™ Object Storage makes it possible to store practically limitless amounts of data, simply and cost effectively.

## Featured technologies
+ [artificial-intelligence](https://developer.ibm.com/technologies/artificial-intelligence/) - Build and train models, and create apps, with a trusted AI-infused platform.
+ [Node.js](https://nodejs.org/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

## Prerequisites

This Cloud pattern assumes you have an **IBM Cloud** account. Go to the 
link below to sign up for a no-charge trial account - no credit card required. 
  - [IBM Cloud account](https://tinyurl.com/y4mzxow5)
  - [Node.js]https://nodejs.org/en/download/)

# Steps
0. [Download the data set ](#step-0-Download-the-data-set)
1. [Clone the repo](#step-1-clone-the-repo)
2. [Set the Model Deployment ID](#step-2-set-the-model-deployment-id)
3. [Set the Model Space ID](#step-3-set-the-model-space-id)
4. [Create an IBM Cloud API key](#step-4-create-an-IBM-Cloud-api-key)
5. [Generate the access token](#step-5-Generate-the-access-token)
6. [Run the application](#step-6-run-the-app)

## Step 1. Clone the repo

First, run the following command to clone the repo in the location of your choice. 

```
git clone https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study
```

## Step 2. Set the Model Deployment ID

In order for our web-app to communicate with our deployed Watson Machine Learning model, we must set a few
environmental variables that our app depends on. The variables are the following:
* Space ID
* Deployment ID
* Authorization Token or `TOKEN`

If you haven't followed the steps in the previous tutorial to deploy your Decision Optimization model, 
you can find the steps [here](https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study/tree/master/tutorials/decision-optimization-tutorial#11-deploy-model-optional---only-needed-for-web-application-connection).

Once you have copied your Deployment ID, go ahead and edit the .env.sample file and fill in the 
`DEPLOYMENT_ID` line. It should look like the following when it is done:

```
DEPLOYMENT_ID='2cbb1ae1-aeb5-zzzzz-b540-76b18de12ca1'
```

## Step 3. Set the Space ID

Follow the step 11.2 in the previous tutorial [here](https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study/tree/master/tutorials/decision-optimization-tutorial#112-save-your-space-id-needed-for-api-access) to find your Space ID where 
your model is deployed. 

Edit the .env.sample file and fill in the `SPACE_ID` line. It should look like the following when it is done:

```
SPACE_ID='6b00e95c-e9c2-zzzz-a01e-01dee680ef87'
```

## Step 4. Create an IBM Cloud API key

Before we can create our authorization token, we need an IBM Cloud API key.

* Go to `cloud.ibm.com` and then from the top-right part of the screen click on `Manage`-> `IAM`.

![manage](https://user-images.githubusercontent.com/10428517/95252784-4d84af80-07d2-11eb-9fdd-1fe119329cef.png)


* Next, click on `API keys` from the left side-bar. Next click on `Create an IBM Cloud API key`.

![create-api-key](https://user-images.githubusercontent.com/10428517/95252429-d4855800-07d1-11eb-80e3-fd3b55d5d0a8.png)


* Name the key as you wish, and then click `Create`. 

![create](https://user-images.githubusercontent.com/10428517/95252417-d222fe00-07d1-11eb-95a9-8bd7c9d4bbce.png)


* Once the key is created, click on the `Download` button.

![download](https://user-images.githubusercontent.com/10428517/95252393-ccc5b380-07d1-11eb-8d14-9d7154f71b86.png)


## Step 5. Generate the access token

* From the command line, type ```curl -V``` to verify if cURL is installed in your system. If cURL is not installed, refer to [this](https://develop.zendesk.com/hc/en-us/articles/360001068567-Installing-and-using-cURL#install) instructions to get it installed.

* Execute the following cURL command to generate your access token, but replace the apikey with the 
apikey you got from step 4 above. 

```
curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=<api-key-goes-here>'
```

As shown in the image below, the apikey can be copy and pasted from the downloaded file from the end of [step 3.3. The curl request would look something like this after the apikey is pasted in:

![api](https://user-images.githubusercontent.com/10428517/95252350-c0d9f180-07d1-11eb-841e-d5cd72da72d4.png)

```
curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=aSULp7nFTJl-jGx*******aQXfA6dxMlpuQ9QsOW'
```

Once you run that command, you should see something like the following:

```
{"access_token":"eyJraWQiOiIyMDIwMTAyMjE4MzMiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01MEFWSzExMDVEIiwiaWQiOiJJQk1pZC01MEFWSzExMDA","refresh_token":"OKCYCb-IdO4HCPUwtJBhtDOhBBz8xvarvbdaWB6n9W2G9IqeOOuMRS7Gs-SP46VGa0LmVVvRwldJiiiBEfVLqYTY5dBZ9MTOf51S5AfC51FbHmHWJuFVTo6","ims_user_id":7560901,"token_type":"Bearer","expires_in":3600,"expiration":1604608674,"refresh_token_expiration":1607197074,"scope":"ibm openid"}%     
```

Copy and paste only the `access_token` part into the `.env.sample` file. Once you've done this, it should look
something like below: (Note that I cut part of the token above, so normally it's much longer)

```
TOKEN='Bearer eyJraWQiOiIyMDIwMTAyMjE4MzMiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01MEFWSzExMDVEIiwiaWQiOiJJQk1pZC01MEFWSzExMDA'
```

Once you are done, the

Save the file, and rename the file to be `.env`. Once you are all done updating the TOKEN, SPACE_ID, and DEPLOYMENT_ID, your file should look something like this, except your token will likely be much longer:

```
PORT=8080

HOST='0.0.0.0'

TOKEN='Bearer eyJraWQiOiIyMDIwMTAyMjE4MzMiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01MEFWSzExMDVEIiwiaWQiOiJJQk1pZC01MEFWSzExMDA'

SPACE_ID='5fd82822-f9ca-4ce8-b653-f48ac3da3161'

NAME='horea-demo-resource'

DEPLOYMENT_ID='a8134b87-8c81-4888-8159-33bd80192e4d'
```

 **Congratulations!** You're now ready to run the app! 

## Step 6. Run the app

From the `web-app` directory, run `npm install`. Once you're dependencies are done installing,
run `npm start` to start the application.

Next, go to `localhost:8080` in the browser of your choice.

You should see something like this:

![Architecture Components](./public/images/app.png)

## Step 6.1 Default Scenario

First, go ahead and try the default scenario. Click on the `Run Scenario` button. 

In a few seconds you should see that a job has been created. 

Wait a few seconds, and then click on the `See Solution` button. This is the same scenario we 
worked with in the previous tutorial. To view the input data that is passed into our 
Decision Optimization model, go to the `data.js` file in the `web-app` directory. 

**Note:** After you click on `see solution` the app may take up to 20 seconds to get the results 
back from the model. Be patient!

![DOproj2](https://media.github.ibm.com/user/79254/files/1a267380-1f7e-11eb-8806-0299b3a9fc44)

## Related Links
* [Predict Insurance Charges with AutoAI](https://github.com/IBM/predict-insurance-charges-with-autoai)
* [Use AutoAI to predict Customer Churn tutorial](https://developer.ibm.com/tutorials/watson-studio-auto-ai/)
* [Predict Loan Default with AutoAI tutorial](https://developer.ibm.com/tutorials/generate-machine-learning-model-pipelines-to-choose-the-best-model-for-your-problem-autoai/)

## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

