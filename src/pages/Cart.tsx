
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, paymentOption } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto p-8 backdrop-blur-lg bg-white/10">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-xl font-semibold">InvestEd Compass Premium</h3>
              <p className="text-lg text-muted-foreground mt-2">Price: $49.99</p>
              
              {paymentOption && (
                <div className="mt-4 p-3 bg-white/10 rounded">
                  <p className="text-sm font-medium">
                    Payment Method: {paymentOption === 'upfront' ? 'Pay Upfront' : 
                                    paymentOption === 'installments' ? 'Monthly Installments' : 
                                    paymentOption === 'student-loan' ? 'Student Loan' : 
                                    paymentOption === 'scholarship' ? 'Scholarship' : 
                                    paymentOption === 'employer' ? 'Employer Sponsored' : 'Standard'}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>$49.99</span>
              </div>
            </div>

            <Button 
              className="w-full md:w-auto mt-6"
              onClick={() => navigate("/checkout", { 
                state: { 
                  userId, 
                  paymentOption 
                }
              })}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
