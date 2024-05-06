const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const FinalStudent = require('../models/finalstudentSchema.js');

const studentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' });
        }
        else {
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save();

            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("school", "schoolName")
                student = await student.populate("sclassName", "sclassName")
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            res.send({ message: "No students found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
const getAllStudentDetail = async (req, res) => {
    try {
        let student = await Student.find().populate("attendance.subName", "subName sessions");
            
        if (student) {
            res.json(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            res.body.password = await bcrypt.hash(res.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })

        result.password = undefined;
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};
const updateProgessResult = async (req, res) => {
    const { subName, marksProgress } = req.body;
    //console.log(marksProgress)

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksProgress = marksProgress;
        } else {
            student.examResult.push({ subName, marksProgress });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateQuizResult = async (req, res) => {
    const { subName, QuizAvg } = req.body;

 try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName   
        );

        if (existingResult) {
            existingResult.QuizAvg = QuizAvg;
        } else {
            student.examResult.push({ subName, QuizAvg });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(600).json(error);
        console.log(error)
    }
};

//?? putAllStudentDetail
const putAllStudentDetail = async (req, res) => {
    try {
        const students = req.body; // Assuming req.body is an array of student objects
        console.log( req.body)
        // Iterate through each student object in the array
        for (const student of students) {
            const {
                _id,
                name,
                rollNum,
                school,
                teachSubject_id,
                teachSubject_subName,
                sclassName,
                examResult,
                attendancePercentage,
                attendanceNewMarks
            } = student;

            const existingStudent = await FinalStudent.findOne({
                Student_id: _id,
                school: school,
                teachSubject_id: teachSubject_id
            });

            if (existingStudent) {
                // Update existing student details
                existingStudent.name = name;
                existingStudent.rollNum = rollNum;
                existingStudent.teachSubject_subName = teachSubject_subName;
                existingStudent.examResult = examResult; // Assign the entire examResult array
                existingStudent.attendancePercentage = parseFloat(attendancePercentage); // Parse attendancePercentage as a Number
                existingStudent.attendanceNewMarks = parseFloat(attendanceNewMarks); // Parse attendanceNewMarks as a Number

                // Save the updated student details
                await existingStudent.save();
            } else {
                // Create a new student record if it doesn't exist
                const newStudent = new FinalStudent({
                    Student_id: _id,
                    name,
                    rollNum,
                    school,
                    teachSubject_id,
                    teachSubject_subName,
                    sclassName,
                    examResult,
                    attendancePercentage: parseFloat(attendancePercentage), // Parse attendancePercentage as a Number
                    attendanceNewMarks: parseFloat(attendanceNewMarks) // Parse attendanceNewMarks as a Number
                });

                // Save the new student record
                await newStudent.save();
            }
        }

        res.status(200).json({ message: 'Students updated/created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.send({ message: 'Student not found' });
        }

        const subject = await Subject.findById(subName);

        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            // Check if the student has already attended the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }

            student.attendance.push({ date, status, subName });
        }

        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id

    try {
        const result = await Student.updateMany(
            { school: schoolId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );

        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getFinalStudentDetail = async (req, res) => {
    try {
        // Retrieve the student by sclassName from the request parameters
        //const { sclassName_id } = req.params;
        //console.log(req.params.id); // Debugging: Log the value of sclassName_id

        // Use the correct field name from your Mongoose schema (e.g., sclassName)
        let student = await FinalStudent.find({ sclassName: req.params.id });
        
        if (student) {
            // If student is found, send the student details in the response
            res.send(student);
        } else {
            // If no student is found with the specified _id, send a message indicating so
            res.send({ message: "No student found" });
        }
    } catch (err) {
        // Handle any errors that occur during the database operation
        res.status(500).json(err);
    }
};




module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    updateProgessResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
    updateQuizResult,
    getAllStudentDetail,
    putAllStudentDetail,
    getFinalStudentDetail
};