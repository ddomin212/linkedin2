function y=numgrad(x,funkce,delta)
y =[funkce([x(1) + delta; x(2) ; x(3)]) - funkce([x(1) - delta; x(2) ; x(3)])/(2*delta);...
    funkce([x(1); x(2) + delta ; x(3)]) - funkce([x(1); x(2) - delta; x(3)])/(2*delta);...
    funkce([x(1); x(2); x(3) + delta]) - funkce([x(1); x(2); x(3) - delta])/(2*delta)];
end