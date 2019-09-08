import useCurrentExhibition from "./useCurrentExhibition";

export default function useIsOpen() {
  const { show, loading } = useCurrentExhibition();

  const isOpen = !!show;

  return {
    isDefinitelyOpen: !loading && isOpen,
    isDefinitelyClosed: !loading && !isOpen,
    isOpen,
    loading,
  };
}
