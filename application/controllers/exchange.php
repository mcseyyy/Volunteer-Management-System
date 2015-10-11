<?php
    function exchange($from, $to, $value)
    {
        $rate['USD']['EUR'] = 0.92;
        $rate['EUR']['USD'] = 1.08;
        $rate['USD']['GBP'] = 0.67;
        $rate['GBP']['USD'] = 1.50;
        $rate['EUR']['GBP'] = 0.72;
        $rate['GBP']['EUR'] = 1.39;
        
        if ($from === $to)
            return $value;
            
        return $value * $rate[$from][$to];
        //return 22;
    }
    
    echo exchange('USD', 'GBP', 100);
?>