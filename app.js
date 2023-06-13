
window.addEventListener('load', solve);

async function solve(e) {
    e.preventDefault();
    const formDiv = document.getElementById("right");
    formDiv.querySelector("button").addEventListener("click", sendForm);
    const productType = document.getElementById("type-product");
    const problemDescription = document.getElementById("description");
    const clientName = document.getElementById("client-name");
    const clientPhone = document.getElementById("client-phone");
    clearRepairForm();

    try {
        await fillFinishedTasks();
    } catch (error) {
        console.log(`No tasks found`)
    }
    document.getElementsByClassName(`clear-btn`)[0].addEventListener(`click`, clearOrders);
    document.getElementById(`loadBtn`).addEventListener(`click`, fillUnfisnihedOrders)

    function sendForm(event) {
        event.preventDefault();

        let productTypeValue = productType.value;
        let problemDescriptionValue = problemDescription.value;
        let clientNameValue = clientName.value;
        let clientPhoneValue = clientPhone.value;

        if (productTypeValue != `` && problemDescriptionValue != `` && clientNameValue != '' && clientPhoneValue != '') {

            createTask(productTypeValue, problemDescriptionValue, clientNameValue, clientPhoneValue);
            clearRepairForm();
        }
    }


    function startRepair(e) {
        e.preventDefault();

        e.target.disabled = true;
        e.target.parentElement.querySelectorAll(`button`)[1].disabled = false;

        const fragemnt = document.createDocumentFragment();

        fragemnt.append(e.target.parentElement);

        document.getElementById(`unfinished-orders`).appendChild(fragemnt);


    }



    async function finishRepair(e) {
        e.preventDefault();

        putTaskInCompleteList(e);

        var taskId = e.target.parentElement.getAttribute(`id`);

        await changeStatus(taskId);

    }


    function putTaskInCompleteList(e) {
        const comletedDiv = createElement(`div`);
        comletedDiv.classList.add(`container`);

        const productType = createElement(`h2`);
        productType.textContent = e.target.parentElement.querySelector(`h2`).textContent;

        const clientInfo = createElement(`h3`);
        clientInfo.textContent = e.target.parentElement.querySelector(`h3`).textContent;

        const problemDescription = createElement(`h4`);
        problemDescription.textContent = e.target.parentElement.querySelector(`h4`).textContent;

        comletedDiv.appendChild(productType);
        comletedDiv.appendChild(clientInfo);
        comletedDiv.appendChild(problemDescription);

        document.getElementById(`completed-orders`).appendChild(comletedDiv);

        e.target.parentElement.parentElement.removeChild(e.target.parentElement);

    }


    async function clearOrders(e) {
        //e.preventDefault();

        let orderArray = Array.from(e.target.parentElement.querySelectorAll(`div`));

        orderArray.forEach(element => {
            e.target.parentElement.removeChild(element);
        });

        try {
            await deleteAllTasks();

        } catch (error) {
            console.log(error);
        }
    }


    function createElement(el) {

        let element = document.createElement(el);

        return element;
    }

    function clearRepairForm() {

        productType.value = "Start working at Appfire";
        problemDescription.value = "";
        clientName.value = "";
        clientPhone.value = "";


    }


    async function createTask(productTypeValue, problemDescriptionValue, clientNameValue, clientPhoneValue) {

        const receivedOrdersDiv = createElement("div");
        receivedOrdersDiv.classList.add("container");

        const productTypeH2 = createElement("h2");
        productTypeH2.textContent = `Title of task: ${productTypeValue}`;

        const statusH2 = createElement(`h2`);
        statusH2.textContent = `Unfinished`;

        const clientInfoH3 = createElement(`h3`);
        clientInfoH3.textContent = `Client information: ${clientNameValue}, ${clientPhoneValue}`;

        const problemDescriptionH4 = createElement(`h4`);
        problemDescriptionH4.textContent = `Description of the problem: ${problemDescriptionValue}`;

        const startRepaitBtn = createElement(`button`);
        startRepaitBtn.classList.add(`start-btn`);
        startRepaitBtn.textContent = `Start task`;
        startRepaitBtn.addEventListener(`click`, startRepair);

        const finishRepairBtn = createElement(`button`);
        finishRepairBtn.classList.add(`finish-btn`);
        finishRepairBtn.textContent = `Finish task`;
        finishRepairBtn.disabled = true;
        finishRepairBtn.addEventListener(`click`, finishRepair);


        receivedOrdersDiv.appendChild(productTypeH2);
        receivedOrdersDiv.appendChild(statusH2);
        receivedOrdersDiv.appendChild(clientInfoH3);
        receivedOrdersDiv.appendChild(problemDescriptionH4);
        receivedOrdersDiv.appendChild(startRepaitBtn);
        receivedOrdersDiv.appendChild(finishRepairBtn);

        var taskId = await createTaskInFirebase(productTypeValue, problemDescriptionValue, clientNameValue, clientPhoneValue);

        receivedOrdersDiv.setAttribute(`id`, taskId);

        document.getElementById(`received-orders`).appendChild(receivedOrdersDiv);



    }




    async function fillUnfisnihedOrders() {

        try {
            var tasks = await getAllUnfinishedTasks();

            if (tasks === null) {
                throw new Error("No task found");
            }
            var fragmet = document.createDocumentFragment();
            tasks.forEach(task => {

                const receivedOrdersDiv = createElement("div");
                receivedOrdersDiv.classList.add("container");

                const productTypeH2 = createElement("h2");
                productTypeH2.textContent = `Product title:  ${task.type}`;

                const statusH2 = createElement(`h2`);
                statusH2.textContent = `Unfinished`;

                const clientInfoH3 = createElement(`h3`);
                clientInfoH3.textContent = `Client information: ${task.clientName}, ${task.phone}`;

                const problemDescriptionH4 = createElement(`h4`);
                problemDescriptionH4.textContent = `Description of the task: ${task.description}`;

                const startRepaitBtn = createElement(`button`);
                startRepaitBtn.disabled = true;
                startRepaitBtn.classList.add(`start-btn`);
                startRepaitBtn.textContent = `Start task`;
                startRepaitBtn.addEventListener(`click`, startRepair);

                const finishRepairBtn = createElement(`button`);
                finishRepairBtn.classList.add(`finish-btn`);
                finishRepairBtn.textContent = `Finish task`;
                finishRepairBtn.addEventListener(`click`, finishRepair);



                receivedOrdersDiv.appendChild(productTypeH2);
                receivedOrdersDiv.appendChild(statusH2);
                receivedOrdersDiv.appendChild(clientInfoH3);
                receivedOrdersDiv.appendChild(problemDescriptionH4);
                receivedOrdersDiv.appendChild(startRepaitBtn);
                receivedOrdersDiv.appendChild(finishRepairBtn);

                receivedOrdersDiv.setAttribute(`id`, task.taskId);

                fragmet.appendChild(receivedOrdersDiv);


            });
            var unfinishedtasksContainer = document.getElementById(`unfinished-orders`);
            var currentTasks = unfinishedtasksContainer.querySelectorAll(`div`);

            currentTasks.forEach(element => {
                unfinishedtasksContainer.removeChild(element);
            });

            unfinishedtasksContainer.appendChild(fragmet);

        } catch (error) {
            console.log(error);
        }
    }


    async function fillFinishedTasks() {

        try {
            var tasks = await getAllFinishedTasks();

            if (tasks === null) {
                throw new Error("No task found");
            }

            tasks.forEach(task => {
                const comletedDiv = createElement(`div`);
                comletedDiv.classList.add(`container`);

                const productType = createElement(`h2`);
                productType.textContent = `Product Type for repairs: ${task.type}`;

                const clientInfo = createElement(`h3`);
                clientInfo.textContent = `Client information: ${task.clientName} ${task.phone}`;

                const problemDescription = createElement(`h4`);
                problemDescription.textContent = `Description ${task.description}`;

                comletedDiv.appendChild(productType);
                comletedDiv.appendChild(clientInfo);
                comletedDiv.appendChild(problemDescription);

                document.getElementById(`completed-orders`).appendChild(comletedDiv);
            });

        } catch (error) {

        }




    }




    //API - functions manipulating FireBase database

    async function getTask(taskId) {

        var url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;

        const headers = {
            "Content-type": `application/json`
        }
        const p = await fetch(url, {
            method: `Get`,
            headers: headers,
        });

        var data = await p.json();

        return data;

    }

    async function changeStatus(taskId) {

        var url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;

        const headers = {
            "Content-type": `application/json`
        }

        var newStatus = await getTask(taskId);

        newStatus[`status`] = `Finished`;
        const p = await fetch(url, {
            method: `put`,
            headers: headers,
            body: JSON.stringify(newStatus)

        });

    }


    async function deleteAllTasks() {

        var url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/.json`;

        const headers = {
            "Content-type": `application/json`
        }
        const p = await fetch(url, {
            method: `DELETE`,
            headers: headers,

        });

        if (!p.ok) {
            throw new Error(`No tasks to delete`);
        }
    }


    async function createTaskInFirebase(productTypeValue, problemDescriptionValue, clientNameValue, clientPhoneValue) {

        var task = {
            type: productTypeValue,
            description: problemDescriptionValue,
            clientName: clientNameValue,
            phone: clientPhoneValue,
            status: "unfinished"
        }

        const url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/.json`;
        const headers = {
            "Content-type": `application/json`
        }

        const p = await fetch(url, {
            method: `Post`,
            headers: headers,
            body: JSON.stringify(task)

        });

        const data = await p.json();

        return data[`name`];

    }


    async function getAllUnfinishedTasks() {

        var url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/.json`;

        const headers = {
            "Content-type": `application/json`
        }
        const p = await fetch(url, {
            method: `Get`,
            headers: headers,
        });

        var data = await p.json();


        const unfinishedTasksArray = Object.keys(data).filter(key => data[key].status == "unfinished").map(key => ({
            taskId: key,
            clientName: data[key].clientName,
            description: data[key].description,
            phone: data[key].phone,
            status: data[key].status,
            type: data[key].type
        })
        );



        return unfinishedTasksArray;


    }


    async function getAllFinishedTasks() {

        var url = `https://craftdemo-78c02-default-rtdb.europe-west1.firebasedatabase.app/tasks/.json`;

        const headers = {
            "Content-type": `application/json`
        }
        const p = await fetch(url, {
            method: `Get`,
            headers: headers,
        });

        var data = await p.json();


        const finishedTasksArray = Object.keys(data).filter(key => data[key].status == "Finished").map(key => ({
            taskId: key,
            clientName: data[key].clientName,
            description: data[key].description,
            phone: data[key].phone,
            status: data[key].status,
            type: data[key].type
        })
        );



        return finishedTasksArray;

    }


}