var express = require('express');
var router = express.Router();
var faq = require("../models/faq");
const idGen = require("../util/idgen");

async function findFaq() {
    var Faq = await faq.findAll();
    if (Faq == null) {
        throw "no faq found"
    } else {
        console.log("faq found");
    }
    return Faq;

};

async function createFaq(faqdata) {
    if (faqdata.section == 0 || faqdata.section == 1) {
        const studentFaq = await faq.create({
            id: idGen(),
            question: faqdata.question,
            answer: faqdata.answer,
            section: faqdata.section 
        }) 
    } else {
        throw "invalid section number, put 0 for student qn and 1 for teacher"
    } 
}

async function deleteFaqbyQuestion(question) {
    const deleted = await faq.findOne({ where: { question: question } });
    console.log("content deleted: " + deleted);
    if (deleted) {
        const confirmedDeletion = await faq.destroy({ where: { question: question } });
        console.log("faq deleted successfully")
    } else {
        throw "question not found in database"

    }
}

router.route("/")
    .get((req, res, next) => {
        findFaq()
            .then((Faq) => {
                res.send(
                    {
                        faqdata: Faq
                    }
                )

            })
    })

    .post((req, res, next) => {

        createFaq(req.body)
            .then(() => {
                res.send({
                    message: "faq created successfully!"
                })
            })
            .catch((err) => res.send({
                message: err
            }))
    })
    
    .delete((req, res, next) => {
        console.log("deleting...");
        deleteFaqbyQuestion(req.body.question)
            .then(() => res.send(
                {
                    message: "faq deleted successfully"
                }
            ))
            .catch((err) => res.send({
                message: err
            }))
    })

module.exports = router;