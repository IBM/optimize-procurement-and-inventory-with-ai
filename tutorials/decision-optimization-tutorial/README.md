# Optimize plant selection based on cost and capacity with Decision Optimization  
 This hands-on lab is created around the persona of a store manager. The manager has information about the demand, and wants to ensure that inventory is optimized by minimizing the cost of distribution. There are many distribution plants to pick from, each with their own capacity and their own cost. Our goal is to minimize the total cost, while still ensuring we meet all of the demand.

In the previous tutorial we used SPSS Modeler to build a model to predict demand. As you can see below, we will use the demand as input, 
and other information about the distribution plants such as production cost and capacity, to reach
our goal of minimizing overall cost.

## Learning Objectives

In this tutorial, you will explore the following key capabilities:
 * You will learn how to build Optimization model
 * A model builder to guide developers through the typical optimization development steps
 * Dashboards for communicating the optimization model results

## Prerequisites

Required software, access, and files
To complete this lab, you will need:
* IBM Cloud Pak for Data
* IBM Watson Machine Learning Service

## Estimated Time
After the prerequisites are met, it should take you around 35-45 minutes to complete this tutorial.

If you are familiar with optimization problems, you can skip down to step 1.

![importProj](images/DO-inputs.png)

## Intro to Decision Optimization 

[Skip down to steps if familiar with Optimization problems](https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study/tree/master/tutorials/decision-optimization-tutorial/intro-scenario#steps)

### How should I use Decision Optimization to reach an optimal solution?

As shown below, there are 5 main steps in order to reach an optimal decision. As users of Decision Optimization, we are only concerned with step 1 and step 2. We want to formulate the business problem, as 
an optimization problem. That means we have to create data tables to represent our business problem.

### What is an Optimization Problem?

An Optimization problem is the problem of finding the best solution from all possible solutions. We 
do this by defining objectives, constraints, and decision variables. 

![importProj](images/DO-process.jpg)

### What is an Optimization Model?

We have to create an optimization model in order to ensure that our CPLEX Optimization engine
knows how to solve the correct problem. Let's take a look at the optimization model in more detail.

An optimization model defined in terms of
 - an objective, decision variables, and constraints
 - a optimization engine to solve the model instance
 - data to create an instance of the model

### What is an Objective?

An objective is what we are trying to solve for. An example of this is maximizing (profit) or minimizing cost, as is the case in our example here.

### What is a Constraint?

A constraint is a condition that the problem must meet in order to reach an optimal solution. For our
example, we are limited by the capacity of our distribution plants. The capacity (or the maximum number of units that a plant can produce) is our constraint in this example.

### What is a Decision Variable?
A decision variable is a quantity that the decision-maker controls. In our case, the decision-maker is 
the CPLEX Optimization engine, and the quantity that it controls is the quantity of each product to 
be produced at a particular plant.

### Optimization Use Cases

Some of the main use cases for optimization are portfolio allocation based on risk-reward, allocation of 
human resources, and determining which plant should manufacture which product, which is the focus of this tutorial.

![importProj](images/use-cases.png)

## Steps

1. [Create Watson Studio service](#1-Create-watson-studio-service)
2. [Create a project](#2-Create-a-project)
3. [Create a Decision Optimization experiment](#3-create-a-decision-optimization-experiment)
4. [Create a Deployment Space](#4-Create-a-deployment-space)
5. [Clone the Repo](#5-Clone-the-repo)
6. [Prepare the Data](#6-Prepare-the-data)
7. [Prepare the Model](#7-Prepare-the-model)
8. [Add Objectives](#8-Add-Objectives)
9. [Add Constraints](#9-Add-Constraints)
10. [Explore Solution](#10-Explore-Solution)
11. [Deploy Model](#11-deploy-model-optional---only-needed-for-web-application-connection)
12. [Import Intermediate Scenario](#12-import-intermediate-scenario)
13. [Conclusion](#13-Conclusion)

### 1. Create Watson Studio service

First login to your IBM Cloud account. Use the video below for directions on how to create IBM Watson Studio Service.

![watsonStudio](https://media.github.ibm.com/user/79254/files/e493eb80-8626-11ea-87b5-f1c7cf8d50e0)

* After logging into IBM Cloud, click `Proceed` to show that you have read your data rights.

* Click on `IBM Cloud` in the top left corner to ensure you are on the home page.

* Within your IBM Cloud account, click on the top search bar to search for cloud services and offerings. Type in `Watson Studio` and then click on `Watson Studio` under `Catalog Results`.

* This takes you to the Watson Studio service page. There you can name the service as you wish. For example, one may name it 
`Watson-Studio-trial`. You can also choose which data center to create your instance in. The gif above shows mine as 
being created in Dallas.

* For this guide, you choose the `Lite` service, which is no-charge. This has limited compute; it is enough
to understand the main functionality of the service.

* Once you are satisfied with your service name, and location, and plan, click on create in the bottom-right corner. This creates your Watson Studio instance. 

* Go to https://cloud.ibm.com/resources and then click on your recently created `Watson Studio` service.

![addProj](images/resources.png)

* Next, click on `Get Started`.

![addProj](images/get-started.png)

### 2. Create a project

Once you click on your Watson Studio service, you should be taken to `Cloud Pak for Data` overview page. From there, click on `Projects`.

![addProj](images/overview.png)

You will be taken to a page which shows your projects. Click on `New Project`.

![addProj](images/new-project.png)

Next, you will be given the option to create a project from a file or from scratch. Click on `Create an empty project`.

![addProj](images/create-project.png)

Next, you will define your project details. First we need to add a storage service. Click on `Add`.

![addProj](images/add-storage.png)

This will take you to the create Cloud Object Storage page. Name your resource as you wish, and click `Create`.

![addProj](images/create-storage.png)

Next, once you go back to your new project, your newly created Cloud Object Storage should automatically be detected. Name 
the project as you want, and click `Create`.

![addProj](images/create-project-final.png)

### 3. Create a Decision Optimization experiment

Next, from your newly created project, click on `Add to project`.

![addProj](images/add-to-project.png)

Select `Decision Optimization experiment`.

![addProj](images/choose-do.png)

You will be taken to the New Decision Optimization experiment page. You'll need a Machine Learning service to work with Decision Optimization. 
Click on `Add service`.

![addProj](images/add-service.png)

This will take you to the `Associate service` page. Click on `New service`, unless you already have a Watson Machine Learning service.

![addProj](images/new-service.png)

Next, click on `Machine Learning`.

![addProj](images/ml.png)

This will take you to the create Machine Learning service page. Name the service as you want, and then click `Create`.

![addProj](images/create-ml.png)

You will be directed back to the `Associate service` page. This time, your newly created Machine Learning service should appear. Click on 
the check-mark next to it, and then on `Associate service`.

![addProj](images/add-ml.png)

### 4. Create a Deployment space

After you associate your service, you should be taken back ot the `New Decision Optimization experiment` page. Next, we need to add a Deployment space. If you do not have one yet, click on `Create a Deployment space`.

![addProj](images/create-deploy.png)

Name the deployment space as you want, and then click `Create`.

![addProj](images/create-deploy2.png)

Back on your `New Decision Optimization experiment` page, your newly created deployment space should be populated. Click `Create`.

![addProj](images/create-deploy3.png)

### 5. Clone the repo

In a terminal of your choice, issue the following command to clone this repository so that you have all the data files needed for 
our experiment.

```
git clone https://github.ibm.com/Horea-Porutiu/decision-optimization-case-study.git
```

### 6. Prepare the data

Next, from the project overview page click on `Assets` from the top tab, and then go down to your newly created `Decision Optimization experiment` and click on it.

![addProj](images/do-click.png)

You will then be taken to the `Prepare data` page of your experiment. Click on browse in the top-right to add data.

![addProj](images/browse.png)

Browse to where you cloned the repository, and go to `decision-optimization-case-study/tutorials/decision-optimization-tutorial/intro-scenario/data` and then select `plants.csv` and `customerDemand.csv` and click `Open`.

![addProj](images/data.png)

Next click on `Import`.

![addProj](images/import.png)

### 7. Prepare the Model

Next, from the `Prepare data` page, click on `Run model`.

![addProj](images/prepare-data.png)
Next, click on Modeling assistant.
![addProj](images/model-assist.png)
Next, you'll be asked to choose the domain of your problem. Choose `Selection and Allocation`.

![addProj](images/select-allocate.png)

Next, we will choose the decision variable. This is what the model will be deciding. For us, it's the optimal number of items to be produced at a certain plant.

Choose the `plants` table, and then click `continue`.
![addProj](images/plants.png)
![addProj](images/continue.png)
![addProj](images/finish.png)

### 8. Add Objectives

* Now the first thing we must do after we have prepared our problem statement is to add our objectives.

* First, delete the default objective.

* Next, type in `maximize total plants allocations` into the `Suggestions` box. Click on the plus sign to add it to our model.

* Next, type in `minimize total cost of plants over all allocations` into the `Suggestions`. Add this to our model. 

![addConstraints](https://media.github.ibm.com/user/79254/files/d8b97180-07e1-11eb-8996-00409eb47171)


### 9. Add Constraints

* The default constraint for our problem is to `Synchronize selection with plants allocations`. Expand this statement to 
define the max and min values. 

* Ensure that the max allocation of plants is defined by `Capacity`.

* Next, the min assignment of plants is `0`.

* Next, move the slider next to `Maximize total plants allocations` to 10, in order to prioritize this objective.

* Next, type in `All plants allocations must be integer` into the `Suggestions`. Add this to our model. 

* Next, type in `for each plants, allocation is less than or equal to Capacity` into the `Suggestions`. Add this to our model. 

* Lastly, type in `for each customerDemand, total allocation of plants (such that plants Product is customerDemand) is less than or equal to Demand` into the `Suggestions`. Add this to our model. 

![constraints](https://media.github.ibm.com/user/79254/files/d6efae00-07e1-11eb-8ed4-f30f7f553ab7)

### 10. Explore Solution
Next, make sure the objectives and constrains are the same as the screenshot below, and then click on `Run model` from the
top-right.

![runModel](https://media.github.ibm.com/user/79254/files/129e6e00-080a-11eb-9897-e103dabd06e5)

* Let's examine our data. Our primary goal with our optimization is to meet demand since we prioritized that objective by moving the slider to 10.

* We know that demand is 100 for hand sanitizer and 120 for masks.

* We also know there are two plants that have high cost (3). We want to limit allocating masks and hand sanitizer 
from those plants as much as possible.

![demand](https://media.github.ibm.com/user/79254/files/ad974800-080a-11eb-96ff-568e5d667435)

Let's examine the solution. Click on the button next to the magnifying glass to open the table in a full screen.

![open](https://media.github.ibm.com/user/79254/files/ae2fde80-080a-11eb-9ebf-24105bb60229)

We can now examine the solution. 

* We see that from the plant that produces mask with the highest cost of 3, we have allocated 0. 

* The plant that produces hand sanitizer with the highest cost of 3, we allocated only 70 units, which is below capacity of the plant. 

* All other plants allocated all of capacity, other than plant 2 which allocated 15 units to masks, since we already produced enough for demand.

<img width="1664" alt="Screen Shot 2020-10-07 at 12 05 34 PM copy" src="https://media.github.ibm.com/user/79254/files/1c6db300-0896-11eb-9b7c-7ec14b6b9bb1">

In conclusion, CPLEX allocated 100 units to the lowest cost plants for creating hand sanitizer, and 120 for masks. We met demand, at the lowest cost possible.

### 11. Deploy Model (Optional - only needed for web-application connection)

Go back to your introScenario by clicking on the scenario on the top of the page. Click on the 
`three-dot` icon and then on `Save for deployment`.

![addProj](images/save-deploy.png)

Name the model as you want. Click `Save`.

![addProj](images/save.png)

You should see a notification that the model was successfully saved. Click on `View in project`. If you missed
the notification, just click on `Projects/demo-sept29`.

![addProj](images/view-proj.png)

From your project, go down to `Models`. You should see your newly saved model there. Click on the `three-dot` icon and then on `Promote`.

![addProj](images/promote.png)

The next page will let you pick which space to deploy to. Pick the one we created in step 4. Click `Promote`.

![addProj](images/promote2.png)

You should see a notification that successfully promoted your model to the deployment space. Click on the
`deployment space` in the notification to prepare your model for deployment. 

![addProj](images/success-deploy.png)

In your deployment space, you should see your model that you promoted. Click on `Deploy`. 

![addProj](images/deploy-sept29.png)

This will create a deployment. Name it as you want, and select the hardware definition you want. Click `Create`.

![addProj](images/demo-deployment.png)

### 11.1 Save your Deployment ID (Needed for API access)
Once you've created the deployment, you should see the `Deployment ID` on the right-hand side of the screen.
Copy this. You will need this for the web-application environmental variables. Once you've saved 
your Deployment ID, click on your deployment space. Mine is `horea-deploy-demo`.

![addProj](images/deployment-id.png)
### 11.2 Save your Space ID (Needed for API access)

Once you're in your deployment space, click on `settings` from the top of the page. 
There you will see your `Space ID`. This is needed for the web-app.

![addProj](images/space-id.png)

### 11. Import Intermediate Scenario

Next, let's import a more complex scenario. Click on the `Scenarios` Button from the top tab.

![addProj](images/scn.png)

From the `Scenarios` tab, click on `Create scenario` and `From file`.

![addProj](images/create-scn.png)

Navigate to where you cloned this repo, and then select go into the `decision-optimization-tutorial/data` and select the `intermediateScenario.zip` file. Click `Open`.

![addProj](images/scn-file.png)

Next, click on `Prepare data` from the left side bar to see the data that is being used for this scenario. You can see here that
the `customerDemand` table has 29 rows, and that the `plants` table has 90 rows. The `customerDemand` table is taken from the 
last month of estimated demand from the SPSS Modeler tutorial, and rounded to the nearest integer value. 

It also has an extra column, which is the `Profit` column. 
The `Profit` column enables us to determine which allocations will bring us the largest profit. 

![addProj](images/prep-data.png)

Next, click on the the `Run model` tab from the left side bar. Here you can see a new objective `Maximize total Profit of plants over all allocations`. Go ahead and `Run model` from the top-right corner.


![addProj](images/model-assist-v2.png)

Once your model has finished running, you can click on `Explore solution` in the left hand side, and then `Solution tables`. Click on 
the icon next to the magnifying glass to view the solution table in full-screen mode.

![addProj](images/soln2.png)

Now, we can see the final solution here. We can see that for the highest cost plants, we are still 
restricting allocation. We are also prioritizing plants to have higher profit over ones that have lower profit.

Great job! You now know how to import scenarios into Decision Optimization.

![addProj](images/final-soln.png)

For more complex scenarios, take a look at [DO-samples](https://github.com/IBMDecisionOptimization/DO-Samples) on GitHub.


### 12. Conclusion
<b>Congratulations!</b> You've just finished running your first decision optimization experiment. You know understand 
how to setup a decision optimization problem, import data, set objectives and constraints, and then run the model. 

In the next part of the tutorial, we will look at a more complex problem with more data tables and more constraints. 

We will also show how to deploy the model to Watson Machine Learning and interact with the model using a web-app.