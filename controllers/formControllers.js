const Form = require("../entity/Form");

const getAllForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: `Server error` });
    }
}


const createForm = async (req, res) => {
    // console.log('form create req, recieved');
    // console.log(`req recieved ${req.body}`);
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.status(200).json(newForm);
    } catch (error) {
        res.status(500).json({ error: `Server error` });
    }
}

const getFormById = async (req, res) => {
    // console.log(`req recieved ${req.body}`);
    try {
        const form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}


const updateFormById = async (req, res) => {
    // console.log(`req recieved ${req.body}`);
    const { title, inputs } = req.body;
    try {
        let form = await Form.findById(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        form.title = title;
        form.inputs = inputs;
        await form.save();
        res.json(form);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteFormById = async (req, res) => {
    // console.log('delete req, recieved', req.params.id);
    try {
        const form = await Form.findByIdAndDelete(req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.json({ message: 'Form deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
module.exports = { getAllForms, createForm, getFormById, updateFormById, deleteFormById };