document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const form = document.getElementById("add-student-form");
  const formStep1 = document.getElementById("form-step-1");
  const formStep2 = document.getElementById("form-step-2");
  const studentNameInput = document.getElementById("student-name");
  const rollNumberInput = document.getElementById("roll-number");
  const numSubjectsInput = document.getElementById("num-subjects");
  const nextStepBtn = document.getElementById("next-step-btn");
  const backBtn = document.getElementById("back-btn");
  const subjectInputsContainer = document.getElementById("subject-inputs");
  const rollError = document.getElementById("roll-error");
  const formErrorStep1 = document.getElementById("form-error-step1");
  const formErrorStep2 = document.getElementById("form-error-step2");
  const studentListBody = document.getElementById("student-list-body");
  const searchInput = document.getElementById("search-input");
  const totalStudentsEl = document.getElementById("total-students");
  const avgGradeEl = document.getElementById("avg-grade");
  const highGradeEl = document.getElementById("high-grade");

  // Application State & Data Cleaning
  let students = (JSON.parse(localStorage.getItem("students")) || [])
    .map((student) => {
      // If data is already in the correct new format (with a subjects array), keep it.
      if (student && Array.isArray(student.subjects)) {
        return student;
      }
      // If data is in the old format (with single subject/grade properties)
      if (student && student.subject && typeof student.grade !== "undefined") {
        // Convert it to the new format
        return {
          id: student.id || Date.now(),
          name: student.name || "Unknown",
          rollNo: student.rollNo || "N/A",
          subjects: [
            { name: student.subject, grade: parseInt(student.grade, 10) || 0 },
          ],
        };
      }
      // If the data is invalid or doesn't match either format, discard it.
      return null;
    })
    .filter((student) => student !== null); // Remove null (invalid) entries

  // --- FUNCTIONS ---

  const saveStudents = () => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  // Immediately save the cleaned data back to localStorage to prevent this error in the future.
  saveStudents();

  const renderStudents = (studentArray = students) => {
    try {
      if (studentArray.length === 0) {
        studentListBody.innerHTML = `<tr class="text-center"><td colspan="5" class="p-8 text-gray-500">No students found.</td></tr>`;
        return;
      }

      const tableHtml = studentArray
        .map((student, index) => {
          if (!student || !Array.isArray(student.subjects)) {
            console.error("Invalid student data detected:", student);
            return ""; // Skip rendering invalid data
          }

          const rowClass = index % 2 === 0 ? "table-row-even" : "table-row-odd";
          const studentAverage =
            student.subjects.length > 0
              ? Math.round(
                  student.subjects.reduce(
                    (sum, sub) => sum + parseInt(sub.grade, 10),
                    0
                  ) / student.subjects.length
                )
              : 0;

          const avgGradeColor =
            studentAverage >= 70
              ? "text-green-400"
              : studentAverage >= 50
              ? "text-yellow-400"
              : "text-red-400";

          const subjectsHtml = student.subjects
            .map(
              (s) => `
                            <div class="flex justify-between text-xs py-0.5">
                                <span class="text-gray-400">${s.name}:</span>
                                <span class="font-semibold">${s.grade}%</span>
                            </div>
                        `
            )
            .join("");

          return `
                            <tr class="${rowClass} border-b border-gray-700 align-top">
                                <td class="p-4 font-mono text-indigo-300">${student.rollNo}</td>
                                <td class="p-4 font-medium text-white">${student.name}</td>
                                <td class="p-4 text-gray-300">${subjectsHtml}</td>
                                <td class="p-4 text-center font-bold ${avgGradeColor}">${studentAverage}%</td>
                                <td class="p-4 text-center">
                                    <button data-id="${student.id}" class="delete-btn btn-delete text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-red-600 transition-all">
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        `;
        })
        .join("");
      studentListBody.innerHTML = tableHtml;
    } catch (error) {
      console.error("Failed to render student list:", error);
      studentListBody.innerHTML = `<tr class="text-center"><td colspan="5" class="p-8 text-red-400">Error displaying student list. Please refresh.</td></tr>`;
    }
  };

  const updateStats = () => {
    try {
      totalStudentsEl.textContent = students.length;

      if (students.length === 0) {
        avgGradeEl.textContent = "0%";
        highGradeEl.textContent = "0%";
        return;
      }

      const studentAverages = students.map((student) => {
        if (
          !student ||
          !Array.isArray(student.subjects) ||
          student.subjects.length === 0
        )
          return 0;
        const total = student.subjects.reduce(
          (sum, sub) => sum + parseInt(sub.grade, 10),
          0
        );
        return Math.round(total / student.subjects.length);
      });

      const classAverage =
        studentAverages.length > 0
          ? Math.round(
              studentAverages.reduce((sum, avg) => sum + avg, 0) /
                studentAverages.length
            )
          : 0;
      const highestAverage =
        studentAverages.length > 0 ? Math.max(...studentAverages) : 0;

      avgGradeEl.textContent = `${classAverage}%`;
      highGradeEl.textContent = `${highestAverage}%`;
    } catch (error) {
      console.error("Failed to update stats:", error);
    }
  };

  const resetForm = () => {
    form.reset();
    subjectInputsContainer.innerHTML = "";
    formStep1.classList.remove("hidden");
    formStep2.classList.add("hidden");
    rollError.classList.add("hidden");
    formErrorStep1.classList.add("hidden");
    formErrorStep2.classList.add("hidden");
  };

  // --- EVENT LISTENERS ---

  nextStepBtn.addEventListener("click", () => {
    const name = studentNameInput.value.trim();
    const rollNo = rollNumberInput.value.trim();
    const numSubjects = numSubjectsInput.value;

    // Validation
    if (!name || !rollNo || !numSubjects) {
      formErrorStep1.classList.remove("hidden");
      return;
    } else {
      formErrorStep1.classList.add("hidden");
    }

    if (students.some((s) => s.rollNo === rollNo)) {
      rollError.classList.remove("hidden");
      return;
    } else {
      rollError.classList.add("hidden");
    }

    formStep1.classList.add("hidden");
    formStep2.classList.remove("hidden");

    subjectInputsContainer.innerHTML = "";
    for (let i = 1; i <= parseInt(numSubjects); i++) {
      const inputs = `
                        <div class="subject-grid">
                            <input type="text" placeholder="Subject ${i} Name" class="form-input w-full rounded-md text-white transition subject-name">
                            <input type="number" placeholder="Grade" min="0" max="100" class="form-input w-24 rounded-md text-white transition subject-grade">
                        </div>
                    `;
      subjectInputsContainer.innerHTML += inputs;
    }
  });

  backBtn.addEventListener("click", () => {
    formStep1.classList.remove("hidden");
    formStep2.classList.add("hidden");
    subjectInputsContainer.innerHTML = "";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const subjects = [];
    const subjectNameInputs = document.querySelectorAll(".subject-name");
    const subjectGradeInputs = document.querySelectorAll(".subject-grade");
    let isStep2Valid = true;

    subjectNameInputs.forEach((input) =>
      input.classList.remove("border-red-500")
    );
    subjectGradeInputs.forEach((input) =>
      input.classList.remove("border-red-500")
    );

    for (let i = 0; i < subjectNameInputs.length; i++) {
      const subjectName = subjectNameInputs[i].value.trim();
      const subjectGradeStr = subjectGradeInputs[i].value.trim();
      const subjectGrade = parseInt(subjectGradeStr, 10);

      let isValid = true;
      if (!subjectName) {
        isValid = false;
        subjectNameInputs[i].classList.add("border-red-500");
      }
      if (
        subjectGradeStr === "" ||
        isNaN(subjectGrade) ||
        subjectGrade < 0 ||
        subjectGrade > 100
      ) {
        isValid = false;
        subjectGradeInputs[i].classList.add("border-red-500");
      }

      if (isValid) {
        subjects.push({ name: subjectName, grade: subjectGrade });
      } else {
        isStep2Valid = false;
      }
    }

    if (!isStep2Valid) {
      formErrorStep2.textContent =
        "Please provide a valid name and a grade (0-100) for all subjects.";
      formErrorStep2.classList.remove("hidden");
      return;
    }

    formErrorStep2.classList.add("hidden");

    const newStudent = {
      id: Date.now(),
      name: studentNameInput.value.trim(),
      rollNo: rollNumberInput.value.trim(),
      subjects: subjects,
    };

    try {
      students.push(newStudent);
      saveStudents();
      renderStudents();
      updateStats();
    } catch (error) {
      console.error("Error during student processing:", error);
    } finally {
      resetForm();
      studentNameInput.focus();
    }
  });

  studentListBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const studentId = parseInt(e.target.dataset.id);
      students = students.filter((student) => student.id !== studentId);
      saveStudents();
      handleSearch();
      updateStats();
    }
  });

  const handleSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        String(student.rollNo).toLowerCase().includes(searchTerm)
    );
    renderStudents(filteredStudents);
  };

  searchInput.addEventListener("input", handleSearch);

  // --- INITIALIZATION ---
  renderStudents();
  updateStats();
});
