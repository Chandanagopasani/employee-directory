<form id="employee-form">
  <input type="hidden" id="employee-id" />
  <label>First Name: <input type="text" id="first-name" required /></label>
  <label>Last Name: <input type="text" id="last-name" required /></label>
  <label>Email: <input type="email" id="email" required /></label>
  <label>Department: <input type="text" id="department" required /></label>
  <label>Role: <input type="text" id="role" required /></label>
  <button type="submit">Save</button>
  <button type="button" onclick="cancelForm()">Cancel</button>
</form>