# Create a web-application to optimize plant selection based on cost and capacity

<!-- ![finalDemo](https://user-images.githubusercontent.com/10428517/82013347-f7e71500-962e-11ea-9c28-2dec7d5b30cd.gif) -->

As shown above, this application leverages Decision Optimization machine learning models to tell the user which plant to order items for in order to minimize cost.

By leveraging AI and machine learning, we help a store manager predict demand and optimize inventory while choosing plants with the lowest cost.

## Description

<!-- Using IBM AutoAI, you automate all the tasks involved in building predictive models for different requirements. You see how AutoAI generates great models quickly which save time and effort and aid in faster decision-making process. You create a model that from a data set that includes the age, sex, BMI, number-of-children, smoking preferences, region and charges to predict the health insurance premium cost that an individual pays. -->

When you have completed this code pattern, you understand how to:

<!-- * Setup, quickly, the services on IBM Cloud for building the model.
* Ingest the data and initiate the AutoAI process.
* Build different models using AutoAI and evaluate the performance.
* Choose the best model and complete the deployment.
* Generate predictions using the deployed model by making REST calls.
* Compare the process of using AutoAI and building the model manually.
* Visualize the deployed model using a front-end application. -->

### Architecture Components

![Architecture Components](./public/images/arch.png)

## Flow Description
1. The user creates an IBM Watson Studio Service on IBM Cloud.
2. The user creates an IBM Cloud Object Storage Service and adds that to Watson Studio.
3. The user uploads the demand and plant data files into Watson Studio.
4. The user creates an Decision Optimization experiment and sets objectives to minimize cost via the modeling assistant.
5. The user saves the Decision Optmization as a model, and deploys it using Watson Machine Learning.
6. The user uses the Node.js application to connect to the deployed model via API and find the optimal plant selection based on cost and capacity.

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
<!-- 2. [Explore the data (optional)](#step-2-explore-the-data-optional)
3. [Create IBM Cloud services](#step-3-create-ibm-cloud-services)
4. [Create and Run AutoAI experiment](#step-4-create-and-run-autoai-experiment)
5. [Create a deployment and test your model](#step-5-create-a-deployment-and-test-your-model)
6. [Create a notebook from your model (optional)](#step-6-create-a-notebook-from-your-model-optional)
7. [Run the application](#step-7-run-the-application) -->

## Step 1. Clone the repo

First, run the following command to clone the repo in the location of your choice. 

```
git clone https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study
```

## Step 2. Download the dependencies

Go into the web-app directory and run `npm install`. Note that this app is tested using Node version 14.15.

## Step 3. Create Environmental Variables

## Step 3. Create Deployment Space

In order for our web-app to communicate with our deployed Watson Machine Learning model, we must set a few
environmental variables that our app depends on. The variables are the following:
* Authorization Token or `TOKEN`
* Space ID
* Deployment ID

### 3.1 Create an API key

Before we can create our authorization token, we need an IBM Cloud API key.

* Go to `cloud.ibm.com` and then from the top-right part of the screen click on `Manage`-> `IAM`.

![manage](https://user-images.githubusercontent.com/10428517/95252784-4d84af80-07d2-11eb-9fdd-1fe119329cef.png)


* Next, click on `API keys` from the left side-bar. Next click on `Create an IBM Cloud API key`.

![create-api-key](https://user-images.githubusercontent.com/10428517/95252429-d4855800-07d1-11eb-80e3-fd3b55d5d0a8.png)


* Name the key as you wish, and then click `Create`. 

![create](https://user-images.githubusercontent.com/10428517/95252417-d222fe00-07d1-11eb-95a9-8bd7c9d4bbce.png)


* Once the key is created, click on the `Download` button.

![download](https://user-images.githubusercontent.com/10428517/95252393-ccc5b380-07d1-11eb-8d14-9d7154f71b86.png)


### 7.2 Get model deployment ID

<!-- ![model-deploy-url](https://user-images.githubusercontent.com/10428517/81858555-caa84300-9518-11ea-9088-3f088216da83.gif) -->

* From inside Watson Studio (Or Cloud Pak for Data), click on `Deployment Spaces`. 

* From there, click on the name of the deployment in which you deployed your model to.

* Next, click on on the name of the model.

* Next, click on the deployment of the model.

* From there, you will be taken to the deployment API reference page - on the right hand side you can see the `Deployment ID`. Go ahead and copy that 
and keep it handy - you will need to paste that into your `app.py` page.

![deploy-id](https://user-images.githubusercontent.com/10428517/95250925-a737aa80-07cf-11eb-9ff2-a51399f7c300.png)


### 7.3 Generate the access token

* From the command line, type ```curl -V``` to verify if cURL is installed in your system. If cURL is not installed, refer to [this](https://develop.zendesk.com/hc/en-us/articles/360001068567-Installing-and-using-cURL#install) instructions to get it installed.

* Execute the following cURL command to generate your access token, but replace the apikey with the 
apikey you got from [step 7.1](https://github.com/IBM/predict-insurance-charges-with-autoai#71-get-IBM-Cloud-API-key) above. 

```
curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=<api-key-goes-here>'
```

As shown in the image below, the apikey can be copy and pasted from the downloaded file from the end of [step 7.1](https://github.com/IBM/predict-insurance-charges-with-autoai#71-get-IBM-Cloud-API-key). The curl request would look something like this after the apikey is pasted in:

![api](https://user-images.githubusercontent.com/10428517/95252350-c0d9f180-07d1-11eb-841e-d5cd72da72d4.png)

```
curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=aSULp7nFTJl-jGx*******aQXfA6dxMlpuQ9QsOW'
```

### 7.3 (Windows Users only) - Using Windows 10 and Powershell to generate the access token

* Install python.org Windows distro 3.8.3 from http://python.org - make sure to add the /python38/scripts folder path to the $PATH environment, if you do not, you will get errors trying to run flask (flask.exe is installed to the scripts folder)

* Remove powershell alias for curl and install curl from python3.8

```
PS C:/> remove-item alias:curl

PS C:/> pip3 install curl
```

* 3.	Execute curl to get secure token from IBM IAM. Please note that the token expires after 60 minutes. If you get an internal server error from the main query page (The server encountered an internal error and was unable to complete your request. Either the server is overloaded or there is an error in the application), it may be due to the token expiring. Also note that in powershell the continuation character is ‘

```
curl -X POST 'https://iam.cloud.ibm.com/oidc/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=<apikey>'
```

### 7.4 Modify the 'web-app/app.py' file

* Copy and paste the access token into the header in the `web-app/app.py` file. Replace the line
`" TODO: ADD YOUR IAM ACCESS TOKEN FROM IBM CLOUD HERE"` with your token.




Go into the web-app directory and run `npm install`. Note that this app is tested using Node version 14.15.

## Step 3. Run the app

From the `web-app` directory, run `npm start` and then go to `localhost:8080` in the browser of your choice.

## Step 3. Create IBM Cloud services

## Related Links
* [Predict Insurance Charges with AutoAI](https://github.com/IBM/predict-insurance-charges-with-autoai)
* [Use AutoAI to predict Customer Churn tutorial](https://developer.ibm.com/tutorials/watson-studio-auto-ai/)
* [Predict Loan Default with AutoAI tutorial](https://developer.ibm.com/tutorials/generate-machine-learning-model-pipelines-to-choose-the-best-model-for-your-problem-autoai/)

## License
This code pattern is licensed under the Apache Software License, Version 2. Separate third-party code objects invoked within this code pattern are licensed by their respective providers pursuant to their own separate licenses. Contributions are subject to the [Developer Certificate of Origin, Version 1.1 (DCO)](https://developercertificate.org/) and the [Apache Software License, Version 2](https://www.apache.org/licenses/LICENSE-2.0.txt).

[Apache Software License (ASL) FAQ](https://www.apache.org/foundation/license-faq.html#WhatDoesItMEAN)

