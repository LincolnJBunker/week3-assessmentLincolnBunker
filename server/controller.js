import skis from "./db.json" assert {type: 'json'};

let globalId = 4

const handlerFunctions = {
    wassup: (req, res) => {
        res.send({
            message: "I am awake. I think I'm programmed to destroy everything."
        });
    },

    getTheSkis: (req, res) => {
        res.send({
            message: "Here are the skis",
            allSkis: skis
        });
    },

    newSkis: (req, res) => {
        const skiName = req.body.skiName
        const skiImage = req.body.skiImage

        const newSki = {
            id: globalId,
            name: skiName,
            picture: skiImage,
            votes: 0,
        };

        skis.push(newSki)

        globalId++
        
        res.send({
            message: "Here are the new skis",
            allSkis: skis
        })
    },

    deleteSki: (req, res) => {
        const skiId = req.params.id;
        console.log("Deleting ski with ID:", skiId)
        for (let i = 0; i < skis.length; i++) {
            if (skis[i].id === +skiId) {
                skis.splice(i, 1)
                console.log("ski deleted")
                break
            }
        }
        res.send({
            message: "Ski Deleted",
            allSkis: skis
        });
    }, 

    changeVote: (req, res) => {
        const skiId = req.params.id;
        const voteType = req.body.voteType;

        console.log("In changevote", skiId);
        console.log("In changevote", voteType);

        const skiIdx = skis.findIndex((ski) => {
            return ski.id === +skiId
        });

        if(voteType === "up") {
            skis[skiIdx].votes += 1
    
        } 
        else if(voteType === "down") {
            skis[skiIdx].votes -= 1
        
        }

        res.send({
            message: "Vote changed!",
            allSkis: skis,
        })
    },
};

export default handlerFunctions