require( '../test-environment-setup' );


const command = require( '../../app/space/commands/change-space-status-command' );
const expect = require( 'chai' ).expect;
const mongoose = require( 'mongoose' );
const PermissionError = require( '../../services/errors/PermissionError' );
const Promise = require('bluebird')


const createRepository = ( space ) => {

    let searchedForSpaceId = null;
    let update = {}

    return {

        findById: ( spaceId ) => {

            searchedForSpaceId = spaceId;

            return new Promise( ( resolve, reject ) => {
                resolve( space );
            } )

        },

        update: ( u ) => {
            update = u;
        },

        getSearchedForSpaceId: () => {
            return searchedForSpaceId;
        },

        getUpdate:  () => {
            return update;
        }

    }

}

const createRequest = ( space, spaceId, userId ) => {

    let repository = createRepository( space );

    return {
        userId: userId,
        commandParams: {
            spaceId: spaceId
        },
        repository: repository
    }

}

describe( 'change space status', () => {

    describe( 'Allows the status to be set to active', () => {


        it( 'will ask the repository for the space', ( done ) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let space = {
                createdBy: userId,
            }

            let request = createRequest( space, spaceId, userId );

            command
                .markSpaceAsActive( request )
                .then( result => { 

                    let searchedForSpaceId = request.repository.getSearchedForSpaceId();

                    expect( searchedForSpaceId ).equal( request.commandParams.spaceId );
                    done();
                })
        } )

        it( "will update the space's status to active", (done) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let space = {
                createdBy: userId,
            }

            let request = createRequest( space, spaceId, userId );


            command
                .markSpaceAsActive( request )  
                .then( result => {
                    let update = request.repository.getUpdate();

                    expect( update.space ).equal( space );
                    expect( update.update.status ).equal( 'active' );
                    done();
                })
        } )

        it( 'will return null if the space does not exist', (done) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let request = createRequest( null, spaceId, userId );


            command
                .markSpaceAsActive( request )
                .then( result => {
                    expect( result ).be.null
                    done();
                 })

        })


        it( 'will throw a permission error if the space was not created by the user', ( done ) => {

            let space = {
                createdBy: mongoose.Types.ObjectId()
            };
            let request = createRequest( space )

            command
                .markSpaceAsActive( request )
                .catch( error => {
                    expect( error ).to.be.an.instanceOf( PermissionError );
                    done();
                });

        })

    });



    describe( 'Allows the status to be set to complete', () => {


        it( 'will ask the repository for the space', ( done ) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let space = {
                createdBy: userId,
            }

            let request = createRequest( space, spaceId, userId );

            command
                .markSpaceAsComplete( request )
                .then( result => { 

                    let searchedForSpaceId = request.repository.getSearchedForSpaceId();

                    expect( searchedForSpaceId ).equal( request.commandParams.spaceId );
                    done();
                })


        } )

        it( "will update the space's status to complete", (done) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let space = {
                createdBy: userId,
            }

            let request = createRequest( space, spaceId, userId );


            command
                .markSpaceAsComplete( request )  
                .then( result => {
                    let update = request.repository.getUpdate();

                    expect( update.space ).equal( space );
                    expect( update.update.status ).equal( 'complete' );
                    done();
                })
        } )

        it( 'will return null if the space does not exist', (done) => {

            let spaceId = mongoose.Types.ObjectId();
            let userId = mongoose.Types.ObjectId();

            let request = createRequest( null, spaceId, userId );


            command
                .markSpaceAsComplete( request )
                .then( result => {
                    expect( result ).be.null
                    done();
                 })

        })


        it( 'will throw a permission error if the space was not created by the user', ( done ) => {

            let space = {
                createdBy: mongoose.Types.ObjectId()
            };
            let request = createRequest( space )

            command
                .markSpaceAsComplete( request )
                .catch( error => {
                    expect( error ).to.be.an.instanceOf( PermissionError );
                    done();
                });

        })

    });

} )