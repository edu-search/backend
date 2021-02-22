var express = require('express');
var router = express.Router();
var faq = require("../models/faq");
const idGen = require("../util/idgen");

async function findStudentFaq() {
    var studentFaq = await faq.findAll({ where: { section: 0 } });
    if (studentFaq == null) {
        throw "no faq found"
    } else {
        console.log("student faq found");
    }
    return studentFaq;

};


async function createFaq(faqdata) {
    if (faqdata.section == 0) {
        const studentFaq = await faq.create({
            id: idGen(),
            question: faqdata.question,
            answer: faqdata.answer,
            section: 0
        })

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
        findStudentFaq()
            .then((studentFaq) => {
                res.send(
                    {
                        faqdata: studentFaq
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
// router.route('/tutor')
//     .get((req, res, next) => {
//         faq.findAll({ where: { section: 1 } })
//     })

module.exports = router;