<?php

$ret = [];
while (($data = fgetcsv(STDIN, null, ",")) !== FALSE) {
    $ret = array_merge($ret, $data);
}

print(json_encode($ret));
print("\n");
?>