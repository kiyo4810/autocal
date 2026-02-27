<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
?>{
  "name": "Yamada",
  "gender": "male",
  "timestamp": "<?php print(date('Y/m/d H:i:s')); ?>"
}
