const fs = require('fs')
const chalk = require('chalk')

//Add Note
const addNote = (title, body) => {
    const notes = loadNotes()
    var duplicate = false
    notes.forEach(note => {
        if(note.title === title){
            duplicate = true
            return
        }
    });

    if(!duplicate){
        notes.push({
            title: title,
            body: body
        })

        saveNote(notes)
        console.log(chalk.green.inverse('Note Added'))
    }
    else{
        console.log(chalk.red.inverse('Title in use'))
    }
}

//Remove Note
const removeNote = (title) =>{
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)

    if(newNotes < notes){
         saveNote(newNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }
    else{
        console.log(chalk.red.inverse('Note not found!'))
    }
   
}

//Save Note
const saveNote = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('notes.json', data)
}

//Load Notes
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e){
        return []
    }
}

//listNotes 
const listNotes = () =>{
    const notes = loadNotes()
    console.log(chalk.blueBright.bold('Your Notes'))
    notes.forEach(note => {
        console.log(note.title)
    })
}

//Read a Note
const readNote = (title) =>{
    const notes = loadNotes()
    const noteFound = notes.find(note => note.title === title)

    if(noteFound){
        console.log(chalk.underline.bold(noteFound.title))
        console.log(noteFound.body)
    }
    else{
        console.log(chalk.red.inverse('Note Not Found!'))
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}