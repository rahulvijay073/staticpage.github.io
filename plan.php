<?php
session_start();
if (!isset($_SESSION['form_data'])) {
    header("Location: index.php");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Investment Plan</title>
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      // Prevent page refresh
      window.addEventListener("beforeunload", function (event) {
        event.preventDefault();
        event.returnValue = ""; // This triggers the confirmation dialog in most browsers
      });

      // Clear cache when back button is clicked
      const backButton = document.querySelector(".back-link");
      backButton.addEventListener("click", function () {
        localStorage.clear(); // Clear all localStorage data
      });

      const tableContainer = document.querySelector(".table-container");
      const ownerAmountElement = document.querySelector("#owneramount");
      const partnerAmountElement = document.querySelector("#partneramount");
      const partnerAvailable = "<?php echo isset($_SESSION['form_data']['partner_name']) && trim($_SESSION['form_data']['partner_name']) !== '' ? 'true' : 'false'; ?>";

      // Initialize amounts and selected cells from localStorage
      let ownerInvest = parseFloat(localStorage.getItem("ownerInvest")) || 0;
      let partnerInvest = parseFloat(localStorage.getItem("partnerInvest")) || 0;
      let ownerSelectedCells = JSON.parse(localStorage.getItem("ownerSelectedCells")) || [];
      let partnerSelectedCells = JSON.parse(localStorage.getItem("partnerSelectedCells")) || [];
      let cachedTable = localStorage.getItem("cachedTable");

      // Function to attach event listeners to cells
      function attachCellListeners() {
        const cells = document.querySelectorAll("td");
        cells.forEach((cell, index) => {
          cell.addEventListener("click", function () {
            const cellAmount = parseFloat(this.querySelector(".cell-amount").textContent.replace(/[^\d]/g, ""));
            const name = "<?php echo $_SESSION['form_data']['name'] ? $_SESSION['form_data']['name'] : 'സുഭദ്ര' ?>";
            const partnerName = "<?php echo isset($_SESSION['form_data']['partner_name']) ? $_SESSION['form_data']['partner_name'] : ''; ?>";

            // SweetAlert added owner confirmation
            Swal.fire({
              title: `Did ${name} add this amount(₹${cellAmount}) ?`,
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            }).then((result) => {
              if (result.isConfirmed) {
                this.querySelector(".cell-amount").classList.add("checked");
                this.innerHTML += '<span class="check-icon">&#10003;</span>'; // Add check icon
                ownerInvest += cellAmount;
                ownerAmountElement.textContent = `₹${ownerInvest.toLocaleString()} /-`;
                ownerSelectedCells.push(index); // Save cell index
                localStorage.setItem("ownerInvest", ownerInvest); // Save to localStorage
                localStorage.setItem("ownerSelectedCells", JSON.stringify(ownerSelectedCells)); // Save selected cells
                localStorage.setItem("cachedTable", tableContainer.innerHTML); // Save updated table
              } else if (partnerAvailable === 'true') {
                // SweetAlert added partner confirmation
                Swal.fire({
                  title: `Did ${partnerName} add this amount(₹${cellAmount}) ?`,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: "Yes",
                  cancelButtonText: "No",
                }).then((partnerResult) => {
                  if (partnerResult.isConfirmed) {
                    this.querySelector(".cell-amount").classList.add("crossed");
                    this.innerHTML += '<span class="cross">&#10007;</span>'; // Add cross icon
                    partnerInvest += cellAmount;
                    partnerAmountElement.textContent = `₹${partnerInvest.toLocaleString()} /-`;
                    partnerSelectedCells.push(index); // Save cell index
                    localStorage.setItem("partnerInvest", partnerInvest); // Save to localStorage
                    localStorage.setItem("partnerSelectedCells", JSON.stringify(partnerSelectedCells)); // Save selected cells
                    localStorage.setItem("cachedTable", tableContainer.innerHTML); // Save updated table
                  }
                });
              }
            });

            this.removeEventListener("click", arguments.callee); // Disable further clicks on this cell
          });
        });
      }

      // If table is cached, load it and reattach event listeners
      if (cachedTable) {
        tableContainer.innerHTML = cachedTable;
        ownerAmountElement.textContent = `₹${ownerInvest.toLocaleString()} /-`;
        if (partnerAvailable === 'true') {
          partnerAmountElement.textContent = `₹${partnerInvest.toLocaleString()} /-`;
        }
        attachCellListeners(); // Reattach event listeners to cells
        return; // Exit early since the table is already loaded
      }

      // Attach event listeners to cells for the first load
      attachCellListeners();
    });
  </script>
</head>
<body>
  <div class="frame">
    <a href="index.php" class="back-link">←</a>
    <a href="#" onclick="window.print()" class="print-link">🖨️</a>
    <div class="heading"><?php echo $_SESSION['form_data']['plan_name'] ? $_SESSION['form_data']['plan_name'] : 'ഞാനും അപ്പനും!. <br/>അപ്പൻ്റെ പെങ്ങൾ സുഭദ്രയും' ?></div>
    <div class="table-container">
      <table>
        <tbody>
          <?php
          $target_total = floatval($_SESSION['form_data']['target_amount']);
          
          // Adjust rows and columns based on target amount
          if ($target_total < 16000) {
              $rows = 5;  // Reduce rows for smaller amounts
              $cols = 10; // Reduce columns for smaller amounts
          } else {
              $rows = 8;
              $cols = 20;
          }
          $total_cells = $rows * $cols;
          
          // Calculate base value per cell (rounded to nearest 100)
          $base_value = floor(($target_total / $total_cells) / 100) * 100;
          
          // If target amount is less than 16,000, adjust the base value to ensure minimum 30 per cell
          if ($target_total < 16000) {
              $base_value = 30; // Set minimum base value
          }
          
          // Create array for all cells
          $values = array();
          $remaining = $target_total;
          
          // Fill all cells except the last one
          for ($i = 0; $i < $total_cells - 1; $i++) {
              // Add some randomness while keeping numbers round
              $variation = rand(-1, 1) * 100;
              $cell_value = max(30, $base_value + $variation);
              // If target is less than 16,000, ensure we don't exceed the remaining amount
              if ($target_total < 16000) {
                  $cell_value = min($cell_value, $remaining - (($total_cells - $i - 1) * 30));
              }
              $values[] = $cell_value;
              $remaining -= $cell_value;
          }
          
          // Last cell gets whatever is needed to reach target exactly
          $values[] = max(100, $remaining);
          
          // Shuffle values for random distribution
          shuffle($values);
          
          $number = 1;
          $actual_total = 0;
          
          // Generate table
          for ($i = 0; $i < $rows; $i++) {
              echo '<tr>';
              for ($j = 0; $j < $cols; $j++) {
                  $value = $values[($i * $cols) + $j];
                  echo '<td>';
                  echo '<span class="cell-amount">₹' . number_format($value, 0) . '</span>';
                  echo '<span class="cell-number">' . $number . '</span>';
                  echo '</td>';
                  $actual_total += $value;
                  $number++;
              }
              echo '</tr>';
          }
          ?>
        </tbody>
      </table>
    </div>
    <div class="bottom-row">
      <div class="legend">
        <div id="owner" class="legend-item"><span class="check">&#10003;</span> <?php echo $_SESSION['form_data']['name'] ? $_SESSION['form_data']['name'] : 'സുഭദ്ര' ?><div id="owneramount">0</div></div>
        <?php if (isset($_SESSION['form_data']['partner_name']) && trim($_SESSION['form_data']['partner_name']) !== ''): ?>
        <div id="partner" class="legend-item"><span class="cross">&#10007;</span> <?php echo $_SESSION['form_data']['partner_name']  ?><div id="partneramount">0</div></div>
        <?php endif; ?>
      </div>
      <div class="amount-big"> <?php echo '₹'. number_format($actual_total, 0) .'/-' ?></div>
    </div>
  </div>
</body>
</html>