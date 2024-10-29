import Files from "./collection";
Files.allow({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Files.allowClient();
