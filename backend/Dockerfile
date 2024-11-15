FROM denoland/deno:2.0.6

# The port that your application listens to.
EXPOSE 8080

WORKDIR /app
RUN chown -R deno:deno /app
RUN mkdir -p /home/deno/.local/share
RUN chown -R deno:deno /home/deno/.local

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY ./ /app
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno install
RUN deno cache main.ts
CMD ["deno", "run", "-A", "--inspect=0.0.0.0:9229", "--watch", "main.ts"]