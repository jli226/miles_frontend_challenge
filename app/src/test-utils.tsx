import React from "react";
import "mobx-react/batchingForReactDom";
import { render } from "@testing-library/react";
import { StoreProvider } from "./store/useStore";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";

export const renderWithProviders = (children: React.ReactChild) =>
  render(
    <StoreProvider>
      <DndProvider backend={TestBackend}>{children}</DndProvider>
    </StoreProvider>
  );
