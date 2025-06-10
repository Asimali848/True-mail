import { ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "@/store";

import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Toaster
            toastOptions={{
              classNames: {
                content: "bg-transparent",
              },
            }}
            duration={1500}
          />
          <TooltipProvider>{children}</TooltipProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
