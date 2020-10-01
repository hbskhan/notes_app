const notes = require('./note.js')
//const chalk = require('chalk')
const yargs = require('yargs')
const { describe, demandOption } = require('yargs')

//Add command
yargs.command({
    command: 'add',
    describe: 'Adds a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Content',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//List command
yargs.command({
    command: 'list',
    describe: 'Lists all the Notes',
    handler() {
        notes.listNotes()
    }
})

//Read command
yargs.command({
    command: 'read',
    describe: 'Read specified Note',
    builder:{
        title:{
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()