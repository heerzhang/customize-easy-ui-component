import { useState, useEffect } from "react";

let id = 0;
const genId = () => ++id;

/**
 * Generate a unique id for a component.
 * Useful for accessibility controls (htmlFor, describedBy)
 * @param id: 自带的初始化，若空 则App运行当前的全局genId++获得；
 */

export const useUid = (id: string = "") => {
  const [generatedId, setGeneratedId] = useState<string>( id || genId().toString() );
  /**
  useEffect(() => setGeneratedId(id || genId().toString()), [id]);
  **/
  return generatedId;
};
