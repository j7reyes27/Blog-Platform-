.new-article-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.new-article-form {
  display: flex;
  flex-direction: column;
}

.new-article-form label {
  margin-bottom: 8px;
  font-weight: bold;
}

.new-article-form input[type="text"],
.new-article-form textarea {
  margin-bottom: 16px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.new-article-form textarea {
  height: 150px;
  resize: none;
}

.tags-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.tag span {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%; /* Make the span take the full width */
  margin-right: 8px; /* Add space between the tag and delete button */
}

.delete-tag {
  background-color: white;
  color: red;
  border: 2px solid red;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* Ensure the delete button doesn't wrap */
}

.delete-tag:hover {
  background-color: darkred;
  color: white;
}

.tag-input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.tag-input-container input[type="text"] {
  flex-grow: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.add-tag {
  background-color: white;
  color: rgb(38, 176, 240);
  border: 2px solid rgb(38, 176, 240);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* Ensure the add button doesn't wrap */
}

.add-tag:hover {
  background-color: #0056b3;
  color: white;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #0056b3;
}
