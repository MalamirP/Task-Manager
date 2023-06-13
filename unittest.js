// Import necessary dependencies and functions
const { JSDOM } = require('jsdom');
const assert = require('assert');

// Create a virtual DOM for testing
const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>');
global.window = dom.window;
global.document = dom.window.document;

// Load the JavaScript file
const script = document.createElement('script');
script.src = 'app.js';
document.head.appendChild(script);

// Define the unit tests
describe('solve', function () {
    it('should clear the repair form', function () {
        // Get form elements
        const productType = document.createElement('input');
        productType.id = 'type-product';
        productType.value = 'Test Product';
        document.body.appendChild(productType);

        const problemDescription = document.createElement('input');
        problemDescription.id = 'description';
        problemDescription.value = 'Test Description';
        document.body.appendChild(problemDescription);

        const clientName = document.createElement('input');
        clientName.id = 'client-name';
        clientName.value = 'John Doe';
        document.body.appendChild(clientName);

        const clientPhone = document.createElement('input');
        clientPhone.id = 'client-phone';
        clientPhone.value = '1234567890';
        document.body.appendChild(clientPhone);

        // Call the function
        solve(new Event('load'));

        // Check if the form elements are cleared
        assert.strictEqual(productType.value, 'Start working at Appfire');
        assert.strictEqual(problemDescription.value, '');
        assert.strictEqual(clientName.value, '');
        assert.strictEqual(clientPhone.value, '');
    });

    it('should create a task and add it to the received orders', async function () {
        // Stub API functions
        const createTaskInFirebase = async function () {
            return 'test-task-id';
        };

        // Stub necessary DOM elements
        const productType = document.createElement('input');
        productType.id = 'type-product';
        productType.value = 'Test Product';
        document.body.appendChild(productType);

        const problemDescription = document.createElement('input');
        problemDescription.id = 'description';
        problemDescription.value = 'Test Description';
        document.body.appendChild(problemDescription);

        const clientName = document.createElement('input');
        clientName.id = 'client-name';
        clientName.value = 'John Doe';
        document.body.appendChild(clientName);

        const clientPhone = document.createElement('input');
        clientPhone.id = 'client-phone';
        clientPhone.value = '1234567890';
        document.body.appendChild(clientPhone);

        const receivedOrders = document.createElement('div');
        receivedOrders.id = 'received-orders';
        document.body.appendChild(receivedOrders);

        // Call the function
        await createTask('Test Product', 'Test Description', 'John Doe', '1234567890');

        // Check if the task is created and added to the received orders
        const tasks = receivedOrders.querySelectorAll('.container');
        assert.strictEqual(tasks.length, 1);
        assert.strictEqual(tasks[0].querySelector('h2').textContent, 'Product type for repair: Test Product');
        assert.strictEqual(tasks[0].querySelector('h3').textContent, 'Client information: John Doe, 1234567890');
        assert.strictEqual(tasks[0].querySelector('h4').textContent, 'Description of the problem: Test Description');
    });
});