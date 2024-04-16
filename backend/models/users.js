import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 }, // Default role is 1 (student)
}, { timestamps: true });

// Pre-save hook to set role based on email
userSchema.pre('save', function(next) {
    if (this.isModified('role') || !this.role) {
        // If role is already set or not modified, skip
        return next();
    }
    // Extract the domain from email
    const emailDomain = this.email.split('@')[1];
    // Set role based on email domain
    switch (emailDomain) {
        case 'ccshead.edu.in':
            this.role = 1;
            break;
        case 'techhead.edu.in':
            this.role = 2;
            break;
        case 'securityhead.edu.in':
            this.role = 3;
            break;
        case 'officehead.edu.in':
            this.role = 4;
            break;
        default:
            // Default role (student) if email domain doesn't match any role
            this.role = 0;
    }
    next();
});

const User = mongoose.model('User', userSchema, 'users');

export { User };
