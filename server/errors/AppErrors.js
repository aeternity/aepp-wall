class AppError extends require('./BaseError') {
	constructor(message) {
		super(message || 'General App Error');
		this.code = 100;
	}
}

class DatabaseError extends require('./BaseError') {
	constructor(message) {
		super(message || 'Database Error');
		this.code = 101;
	}
}

module.exports = {
	AppError: AppError,
	DatabaseError: DatabaseError
};
