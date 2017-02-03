
module.exports = {

    createSummaryDto( card ) {

        return {
            id: card._id,
            title: card.title,
            text: card.text,
            status: card.status,
            dateAdded: card.dateAdded
        }
    }
}
