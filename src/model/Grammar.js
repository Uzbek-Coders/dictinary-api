import mongoose from 'mongoose'


const grammarSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        minLength: 1,
        maxLength: 255,
        trim: true
    },
    body: {
        required: true,
        type: String,
        minLength: 1,
        maxLength: 32767,
        trim: true
    },
    category: {
        required: true,
        type: String,
        enum: [
            'Adjectives and adverbs',
            'Easily confused words',
            'Nouns, pronouns and determiners',
            'Prepositions and particles',
            'Using English',
            'Verbs',
            'Words, sentences and clauses'
        ]
    }
}, { timestamps: true, collection: 'grammar' })


export default mongoose.model('Grammar', grammarSchema)
